# C#委托



# C#委托
## 简介
委托在很多语言都有实现，比如c,c++叫函数指针

## 声明委托
```c#
//无返回值
delegate void MyDele(int a,int b);
//有返回值
  delegate int MyDele(int a,int b);

  //泛型委托
  delegate T MyDele<T>(T a,T b);
  delegate T MyDele<T>(T a,T b);

```
## 使用委托

```c#
  static void Main(){
    MyDele dele = new(add);
    int res = dele(1,2);
    System.Console.WriteLine(res)   ;

  }

  static int add(int a,int b){
    System.Console.WriteLine("exec a+b");
    return a+b;
  }

```
## 库自带的委托

在c#库中，已经帮我们定义好了委托，其中不带返回值的委托叫`Action`,不带返回值的叫`Func`


