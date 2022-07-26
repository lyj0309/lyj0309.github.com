# ASP NET CORE Auth


# 前言

首先我们来看一下在ASP.NET时代，Authentication是如何使用的。下面介绍的是`System.Web.Security.FormsAuthentication`：

```c#

// 登录
System.Web.Security.FormsAuthentication.SetAuthCookie("userName", false);

if(User.Identity.IsAuthenticated) {  // 已认证
    
}

// 退出登录
System.Web.Security.FormsAuthentication.SignOut();

```

这是一个最简单的认证用法：

1.  用户填写账号密码并提交登录；
2.  服务器应用通过`System.Web.Security.FormsAuthentication.SetAuthCookie(string userName, bool createPersistentCookie)`来生成Auth Cookie，并返回到browser；
3.  用户进行下一个操作时，会带上Auth Cookie发到服务器应用；
4.  服务器应用解析并绑定到`Controller.User`属性上，通过`User.Identity.IsAuthenticated`判断用户是否已认证；
5.  最后通过`System.Web.Security.FormsAuthentication.SignOut()`来删除Auth Cookie；

想要设置生成的Auth Cookie属性，可以通过修改`web.cofig`的`<authentication>`配置项：

```xml
<configuration>
  ...
  
  <system.web>
    <authentication mode="Forms" >
      <forms cookieless="UseCookies" domain="" path="" name="" timeout="" loginUrl=""></forms>
    </authentication>
    
  </system.web> 
  
  ....
</configuration>
```

更多配置项可查看[FormsAuthenticationConfiguration](https://docs.microsoft.com/zh-cn/dotnet/api/system.web.configuration.formsauthenticationconfiguration?view=netframework-4.8)。

# Authentication in ASP.NET Core

虽然ASP.NET与ASP.NET Core的底层设计很不一样，但Authentication的基本用法并没有太大的改变，同样通过`HttpContext.User`来判断认证。

ASP.NET的Authorisation是role-based的，而ASP.NET Core的是基于claims-based的（虽然ASP.NET Core同样支持role-based，但这更多是为了向后兼容，推荐使用claims-based）。

# Claims-based authentication

要理解Claims-based authentication，就必须理解Claim, ClaimsIdentity, ClaimsPrincipal这三者的关系。

**Claim**是对被认证主体特征的一种表述，比如：登录用户名是...，email是...，用户Id是...，其中的“登录用户名”，“email”，“用户Id”就是ClaimType。

对应现实中的事物，比如驾照，驾照中的“身份证号码：xxx”是一个claim，“姓名：xxx”是另一个claim。

一组claims构成了一个identity，具有这些claims的identity就是**ClaimsIdentity** ，驾照就是一种ClaimsIdentity，可以把ClaimsIdentity理解为“证件”，驾照是一种证件，护照也是一种证件。

ClaimsIdentity的持有者就是**ClaimsPrincipal** ，一个ClaimsPrincipal可以持有多个ClaimsIdentity，就比如一个人既持有驾照，又持有护照。

# 举例说明

上面对Claim, ClaimsIdentity, ClaimsPrincipal三者的描述可能还有些不太好理解，下面会举例说明这三者的关系：

以登机为例，在登机前需要完成以下步骤：

1.  取登机牌
2.  过安检
3.  VIP区候机（假设你是VIP）

### 1\. 取登机牌

你到了机场，要向客服打印登机牌（虽然现在已经是通过机操打印的了），客服问你叫什么名字，并要求出示能证明你名字的相关证书，例如Passport，其中名字就是一个`Claim`，Passport就是一个`ClaimsIdentity`。

### 2\. 过安检

当你拿到了登机牌（BoardingPass）并准备过安检，此时安检人员要求你出示航班号，此时你拿出登机牌给安检人员查看航班号，其中航班号就是一个`Claim`，BoardingPass就是一个`ClaimsIdentity`。

### 3\. VIP区候机

当你通过安检进入了候机区，你是机场的VIP，就打算到VIP区休息一下，此时工作人员要求你出示VIP号，你拿出VIP片给工作人员查看，其中VIP号就是一个`Claim`，VIP片就是一个`ClaimsIdentity`。

上面的每个步骤如果都不能出示相应的`ClaimsIdentity`就会被拒绝执行指示，下面的图展示了这个过程：

![image](https://andrewlock.net/content/images/2016/08/Untitled.png)

最后全部的`ClaimsIdentity`代表了你本人，而你就是`ClaimsPrincipal`。
