# ASP.NET Core入门


## 依赖注入的声明周期（设计模式）
https://www.cnblogs.com/huangxincheng/p/13594386.html
## 依赖注入
ASP.NET Core 通过依赖关系注入进行生成。 服务（例如 SchoolContext）在应用程序启动期间通过依赖关系注入进行注册。 需要这些服务（如 Razor 页面）的组件通过构造函数参数提供相应服务。 本教程的后续部分介绍了用于获取数据库上下文实例的构造函数代码。

基架工具自动将上下文类注册到了依赖项注入容器。
[详情](https://docs.microsoft.com/zh-cn/aspnet/core/fundamentals/dependency-injection?view=aspnetcore-6.0)

## log4net
在目录下有一个log4net配置文件，可以指定输出方法
## 自动数据类型转换
需要用到两个库
### AutoMapper
自动数据类型转换  
### DependencyInjection
依赖注入

### 拓展实例
```c#
public static class AutoMapperExtensions
{
    //IServiceProvider是system接口
    private static IServiceProvider _serviceProvider;
    public static void UseAutoMapper(this IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }

    public static TDestination MapTo<TDestination>(this object source)
    {
        //DependencyInjection拓展了GetRequiredService方法
        //AutoMapper 实现IMapper类
        var mapper = _serviceProvider.GetRequiredService<IMapper>();
        return mapper.Map<TDestination>(source);
    }
    public static List<TDestnation> MapToList<TDestnation>(this IEnumerable source)
    {
        var mapper = _serviceProvider.GetRequiredService<IMapper>();
        return mapper.Map<List<TDestnation>>(source);
    }
}
```
在程序开始时候注入
```c#
    builder.Services.AddAutoMapper(typeof(AutoMapperProfile));
    builder.Services.AddAutoMapper(Assembly.GetEntryAssembly());
    //注入自己写的automapper拓展
    app.Services.UseAutoMapper();

```

## 目录列表
### common
常用方法，例如拓展string拓展方法

### Repositories 
数据库方面
#### Entites
数据表
## 相关文章

