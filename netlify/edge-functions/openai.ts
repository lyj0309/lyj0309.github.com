const PREFIX = '/opai/'
const BASE_URL='https://api.openai.com'
export default async (request: Request):Promise<Response> => {
    const url = new URL(request.url);
    url.host = BASE_URL.replace(/^https?:\/\//, '').replace(PREFIX,"/");
  
    const modifiedRequest = new Request(url.toString().replace(PREFIX,"/"), {
      headers: request.headers,
      method: request.method,
      body: request.body,
      redirect: 'follow'
    });
  
    const response = await fetch(modifiedRequest);
    const modifiedResponse = new Response(response.body, response);
  
    // 添加允许跨域访问的响应头
    modifiedResponse.headers.set('Access-Control-Allow-Origin', '*');
  
    return modifiedResponse;

}

export const config = { path: "/opai**" }
