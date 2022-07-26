# ASP NET CORE jwt认证



## 区分鉴权（Authentication）和授权（Authorization）

### 鉴权（Authentication）

简单来说，鉴权就是判断是不是你这个人，比如就现实而言，就像你可以用人脸，指纹或者身份证来证明你就是你，在一般系统中，有很多种鉴权方式，比如cookie,jwt,openid还有一些第三方认证比如qq登录，微信登录

### 授权（Authorization）

现在已经知道你就是你了，然后要看你能不能用这个接口，比如你是员工，但是你能调用管理员的接口，这是会乱套的

## jwt结构

![image.png](http://tva1.sinaimg.cn/large/008rgIcAly1h4foz4dp87j30qi0fhdgs.jpg)

## 认证流程

![image.png](http://tva1.sinaimg.cn/large/008rgIcAly1h4fpfysoezj30co09v756.jpg)

## 配置中间件和依赖注入

### 配置文件&model

```cs
namespace JwtAuthSample
{
    public class JwtSettings
    {
        // token颁发者
        public string Issure{get;set;}
        // token使用的客户端
        public string Audience{get;set;}
        // 加密Key
        public string SecretKey="hellokey";
    }
}
```

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Warning"
    }
  },
  "AllowedHosts": "*",
  "JwtSettings":{
    "Audience":"http://localhost:5000",
    "Issuer":"http://localhost:5000",
    "SecretKey":"Hello-key"
  }
}
```

### Program.cs

```cs
 // 添加在services.AddMvc()之前
            services.Configure<JwtSettings>(Configuration);
            var JwtSettings = new JwtSettings();
            Configuration.Bind("JwtSettings",JwtSettings);
            // 认证MiddleWare配置
            services.AddAuthentication(options=>{
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            // Jwt配置
            .AddJwtBearer(o=>{
                o.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters{
                    ValidIssuer = JwtSettings.Issure,
                    ValidAudience = JwtSettings.Audience,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(JwtSettings.SecretKey))// 对称加密
                };
            });

            app.UseAuthentication();            
```

## 授权

xxxController.cs

```cs
// 添加引用
using Microsoft.AspNetCore.Authorization;

    // 添加特性
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
```

只要是系统内就能调用这个接口

### 基于角色（Role）的授权

给用户返回jwt的时候，把角色授予用户
login逻辑

```cs
····
            var claims = new Claim[]{
                    new Claim(ClaimTypes.Name, "mingson"),
                    //new Claim(ClaimTypes.Role, "admin"),
                    new Claim(ClaimTypes.Role, "user")
                    };
                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.SecretKey));// 对称加密算法
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var token = new JwtSecurityToken(
                    _jwtSettings.Issure,
                    _jwtSettings.Audience,
                    claims,
                    DateTime.Now,
                    DateTime.Now.AddMinutes(30),
                    creds);

                return Ok(new {token = new JwtSecurityTokenHandler().WriteToken(token)});
····
```

注入配置

```cs
  public AuthorizeController(IOptions<JwtSettings> _jwtSettingsAccesser)
        {
            _jwtSettings = _jwtSettingsAccesser.Value;
        }
```

接口授权配置

```cs
    [Authorize(Role="Admin,User")] //或

    [Authorize(Role="Admin")] //与
    [Authorize(Role="User")]
```
在逻辑中获取Role
