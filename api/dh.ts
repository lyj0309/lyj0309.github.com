// Netlify Functions 版本的 Docker Hub 镜像代理
// 路径格式: xxx.cn/hub/nginx:latest 或 xxx.cn/hub/library/nginx:latest

const hub_host = 'registry-1.docker.io';
const auth_url = 'https://auth.docker.io';

/**
 * 解析友好路径格式 /hub/nginx:latest 为标准 Docker 路径
 * @param {string} path 请求路径
 * @returns {object} 解析后的信息
 */
function parseHubPath(path) {
	// 匹配 /hub/镜像名:标签 或 /hub/镜像名@digest
	const hubMatch = path.match(/^\/hub\/([^:@]+)(?::([^/@]+)|@(.+))?$/);
	
	if (hubMatch) {
		let imageName = hubMatch[1];
		const tag = hubMatch[2] || 'latest';
		const digest = hubMatch[3];
		
		// 如果镜像名不包含 /，添加 library/ 前缀
		if (!imageName.includes('/')) {
			imageName = `library/${imageName}`;
		}
		
		return {
			isHubPath: true,
			imageName,
			tag,
			digest,
			// 转换为标准 v2 路径
			v2Path: digest 
				? `/v2/${imageName}/manifests/${digest}`
				: `/v2/${imageName}/manifests/${tag}`,
			repo: imageName
		};
	}
	
	return { isHubPath: false };
}

/**
 * 获取认证 token
 * @param {object} userAuth 用户认证信息
 * @param {string} repo 仓库名称
 * @param {object} headers 请求头
 */
async function getDockerToken(userAuth, repo, headers) {
	// 如果用户提供了 token，直接使用
	if (userAuth && userAuth.type === 'token') {
		console.log('Using user provided token');
		return userAuth.token;
	}
	
	// 构建 token 请求
	const scope = `repository:${repo}:pull,push`;
	const tokenUrl = `${auth_url}/token?service=registry.docker.io&scope=${scope}`;
	const tokenHeaders = {
		'User-Agent': headers['user-agent'] || 'Netlify-Docker-Proxy/1.0',
		'Accept': headers.accept || 'application/json',
		'Accept-Language': headers['accept-language'] || 'en-US,en;q=0.9',
		'Accept-Encoding': headers['accept-encoding'] || 'gzip, deflate, br',
		'Connection': 'keep-alive',
		'Cache-Control': 'max-age=0'
	};
	
	// 添加用户认证
	if (userAuth && userAuth.type === 'basic') {
		const credentials = Buffer.from(`${userAuth.username}:${userAuth.password}`).toString('base64');
		tokenHeaders['Authorization'] = `Basic ${credentials}`;
	}
	
	const tokenRes = await fetch(tokenUrl, { headers: tokenHeaders });
	const tokenData = await tokenRes.json();
	return tokenData.token;
}

/**
 * 检测用户认证信息
 * @param {object} headers 请求头
 */
function parseUserAuth(headers) {
	const authHeader = headers.authorization;
	const dockerToken = headers['x-docker-token'];
	
	if (dockerToken) {
		console.log('User provided Docker token');
		return { type: 'token', token: dockerToken };
	}
	
	if (authHeader) {
		if (authHeader.startsWith('Basic ')) {
			try {
				const base64Credentials = authHeader.split(' ')[1];
				const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
				const [username, password] = credentials.split(':');
				console.log(`User authenticated with username: ${username}`);
				return { type: 'basic', username, password };
			} catch (e) {
				console.error('Failed to parse Basic Auth header:', e);
			}
		} else if (authHeader.startsWith('Bearer ')) {
			const token = authHeader.split(' ')[1];
			console.log('User provided Bearer token');
			return { type: 'token', token };
		}
	}
	
	return null;
}

/**
 * 代理请求到 Docker Hub
 * @param {string} targetUrl 目标 URL
 * @param {object} headers 请求头
 * @param {string} method HTTP 方法
 * @param {any} body 请求体
 */
async function proxyToDockerHub(targetUrl, headers, method, body) {
	const proxyHeaders = {
		'Host': hub_host,
		'User-Agent': headers['user-agent'] || 'Netlify-Docker-Proxy/1.0',
		'Accept': headers.accept || 'application/vnd.docker.distribution.manifest.v2+json',
		'Accept-Language': headers['accept-language'] || 'en-US,en;q=0.9',
		'Accept-Encoding': headers['accept-encoding'] || 'gzip, deflate, br',
		'Connection': 'keep-alive'
	};
	
	// 复制 Authorization 头
	if (headers.authorization) {
		proxyHeaders['Authorization'] = headers.authorization;
	}
	
	// 复制其他可能需要的头
	if (headers['x-amz-content-sha256']) {
		proxyHeaders['X-Amz-Content-Sha256'] = headers['x-amz-content-sha256'];
	}
	
	const response = await fetch(targetUrl, {
		method,
		headers: proxyHeaders,
		body: body || undefined
	});
	
	return response;
}

/**
 * Netlify Functions Handler
 */
exports.handler = async (event, context) => {
	try {
		const { path, httpMethod, headers, body, queryStringParameters } = event;
		
		console.log(`Request: ${httpMethod} ${path}`);
		
		// 转换 headers 为小写键
		const normalizedHeaders = {};
		for (const [key, value] of Object.entries(headers)) {
			normalizedHeaders[key.toLowerCase()] = value;
		}
		
		// 检测用户认证
		const userAuth = parseUserAuth(normalizedHeaders);
		
		// 处理根路径 - 返回帮助页面
		if (path === '/.netlify/functions/netlify-docker-hub' || path === '/') {
			return {
				statusCode: 200,
				headers: {
					'Content-Type': 'text/html; charset=UTF-8',
					'Access-Control-Allow-Origin': '*'
				},
				body: `
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Docker Hub 镜像代理</title>
	<style>
		body { font-family: system-ui; max-width: 800px; margin: 50px auto; padding: 20px; }
		h1 { color: #0066ff; }
		code { background: #f4f4f4; padding: 2px 6px; border-radius: 3px; }
		.example { background: #f9f9f9; padding: 15px; border-left: 3px solid #0066ff; margin: 10px 0; }
	</style>
</head>
<body>
	<h1>🐳 Docker Hub 镜像代理</h1>
	<p>通过友好的 URL 格式访问 Docker Hub 镜像</p>
	
	<h2>使用方法</h2>
	<div class="example">
		<p><strong>拉取官方镜像（library）：</strong></p>
		<code>docker pull your-domain.com/hub/nginx:latest</code><br>
		<code>docker pull your-domain.com/hub/redis:7.0</code>
	</div>
	
	<div class="example">
		<p><strong>拉取用户镜像：</strong></p>
		<code>docker pull your-domain.com/hub/username/imagename:tag</code>
	</div>
	
	<h2>登录支持（访问私有仓库）</h2>
	<p>支持以下认证方式：</p>
	<ul>
		<li><strong>X-Docker-Token:</strong> 自定义请求头传递 token</li>
		<li><strong>Authorization: Basic</strong> - 用户名:密码（Base64）</li>
		<li><strong>Authorization: Bearer</strong> - Docker Hub token</li>
	</ul>
	
	<h2>配置 Docker</h2>
	<p>在 <code>/etc/docker/daemon.json</code> 中添加：</p>
	<div class="example">
		<pre>{
  "registry-mirrors": ["https://your-domain.com/hub"]
}</pre>
	</div>
</body>
</html>
				`
			};
		}
		
		// 解析路径
		const pathInfo = parseHubPath(path);
		
		if (pathInfo.isHubPath) {
			console.log(`Parsed hub path - Image: ${pathInfo.imageName}, Tag: ${pathInfo.tag || pathInfo.digest}`);
			
			// 获取 token
			const token = await getDockerToken(userAuth, pathInfo.repo, normalizedHeaders);
			
			// 构建目标 URL
			const targetUrl = `https://${hub_host}${pathInfo.v2Path}`;
			
			// 添加 Authorization 头
			const requestHeaders = { ...normalizedHeaders };
			if (token) {
				requestHeaders.authorization = `Bearer ${token}`;
			}
			
			// 代理请求
			const dockerResponse = await proxyToDockerHub(
				targetUrl,
				requestHeaders,
				httpMethod,
				body
			);
			
			// 读取响应体
			const responseBody = await dockerResponse.arrayBuffer();
			
			// 构建响应头
			const responseHeaders = {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Expose-Headers': '*',
				'Cache-Control': 'max-age=3600'
			};
			
			// 复制重要的响应头
			const headersToKeep = [
				'content-type',
				'content-length',
				'docker-content-digest',
				'docker-distribution-api-version',
				'etag',
				'location',
				'www-authenticate'
			];
			
			for (const header of headersToKeep) {
				const value = dockerResponse.headers.get(header);
				if (value) {
					responseHeaders[header] = value;
				}
			}
			
			// 处理重定向
			if (dockerResponse.status >= 300 && dockerResponse.status < 400) {
				const location = dockerResponse.headers.get('location');
				if (location) {
					console.log(`Redirecting to: ${location}`);
					return {
						statusCode: dockerResponse.status,
						headers: responseHeaders,
						body: ''
					};
				}
			}
			
			return {
				statusCode: dockerResponse.status,
				headers: responseHeaders,
				body: Buffer.from(responseBody).toString('base64'),
				isBase64Encoded: true
			};
		}
		
		// 不是 hub 路径，返回 404
		return {
			statusCode: 404,
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			},
			body: JSON.stringify({
				error: 'Not found',
				message: 'Use /hub/image:tag format to pull Docker images',
				example: '/hub/nginx:latest'
			})
		};
		
	} catch (error) {
		console.error('Error:', error);
		return {
			statusCode: 500,
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			},
			body: JSON.stringify({
				error: 'Internal Server Error',
				message: error.message
			})
		};
	}
};
