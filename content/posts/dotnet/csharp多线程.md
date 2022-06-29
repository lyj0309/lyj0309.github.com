---
title: "C#多线程"
date: 2022-06-24T11:48:10+08:00
draft: true
---
## 1、Task产生背景

`Task`出现之前，微软的多线程处理方式有：`Thread→ThreadPool→委托的异步调用`，虽然也可以基本业务需要的多线程场景，但它们在多个线程的等待处理方面、资源占用方面、线程延续和阻塞方面、线程的取消方面等都显得比较笨拙，在面对复杂的业务场景下，显得有点捉襟见肘了。

`ThreadPool`相比`Thread`来说具备了很多优势，但是`ThreadPool`却又存在一些使用上的不方便。比如：

* `ThreadPool`不支持线程的取消、完成、失败通知等交互性操作；
* `ThreadPool`不支持线程执行的先后次序；

正是在这种背景下，`Task`应运而生。Task是微软在`.Net 4.0`时代推出来的，也是微软极力推荐的一种多线程的处理方式，`Task`看起来像一个`Thread`，实际上，它是在`ThreadPool`的基础上进行的封装，`Task`的控制和扩展性很强，在线程的延续、阻塞、取消、超时等方面远胜于`Thread`和`ThreadPool`。以下是一个简单的任务示例：

```C#
static void Main(string[] args)
{
    Task t = new Task(() =>
    {
        Console.WriteLine("任务开始工作……");
        Thread.Sleep(5000);  //模拟工作过程
    });
    t.Start();
    t.ContinueWith(task =>
    {
        Console.WriteLine("任务完成，完成时候的状态为：");
        Console.WriteLine("IsCanceled={0}\tIsCompleted={1}\tIsFaulted={2}", 
                          task.IsCanceled, task.IsCompleted, task.IsFaulted);
    });
    Console.ReadKey();
}
```

## 2、Task使用方法

### 2.1　创建和启动任务

#### 2.1.1 无返回值的方式

##### 方式1:调用Start方法

```C#
var t1 = new Task(() => TaskMethod("Task 1"));
t1.Start();
Task.WaitAll(t1);//等待所有任务结束 
```

任务的状态：`Start`之前为`Created`，之后为`WaitingToRun`

##### 方式2:静态方法Run

```C#
Task.Run(() => TaskMethod("Task 2"));
```

##### 方式3:TaskFactory工厂

```C#
// 方法1. TaskFactory工厂
TaskFactory taskFactory = new TaskFactory() ;
taskFactory.StartNew(() => TaskMethod("Task 3"));
// 方法2. Task.Factory属性
Task.Factory.StartNew(() => TaskMethod("Task 3"));
//或者
var t3=Task.Factory.StartNew(() => TaskMethod("Task 3"));
Task.WaitAll(t3);
```

任务的状态：`Start`之前为`Running`，之后为`Running`

```C#
static void Main(string[] args)
{
    var t1 = new Task(() => TaskMethod("Task 1"));
    var t2 = new Task(() => TaskMethod("Task 2"));
    t2.Start();
    t1.Start();
    Task.WaitAll(t1, t2);
    Task.Run(() => TaskMethod("Task 3"));
    Task.Factory.StartNew(() => TaskMethod("Task 4"));
    //标记为长时间运行任务,则任务不会使用线程池,而在单独的线程中运行。
    Task.Factory.StartNew(() => TaskMethod("Task 5"), TaskCreationOptions.LongRunning);
    
    #region 常规的使用方式
    Console.WriteLine("主线程执行业务处理.");
    //创建任务
    Task task = new Task(() =>
                         {
                             Console.WriteLine("使用`System.Threading.Tasks.Task`执行异步操作.");
                             for (int i = 0; i < 10; i++)
                             {
                                 Console.WriteLine(i);
                             }
                         });
    //启动任务,并安排到当前任务队列线程中执行任务(System.Threading.Tasks.TaskScheduler)
    task.Start();
    Console.WriteLine("主线程执行其他处理");
    task.Wait();
    #endregion

    Thread.Sleep(TimeSpan.FromSeconds(1));
    Console.ReadLine();
}

static void TaskMethod(string name)
{
    Console.WriteLine("Task {0} is running on a thread id {1}. Is thread pool thread: {2}",
                      name, Thread.CurrentThread.ManagedThreadId, Thread.CurrentThread.IsThreadPoolThread);
}
```

##### 方式4:RunSynchronously同步启动

`Task`实例化后调用同步方法`RunSynchronously`，进行线程启动。\(PS: 类似委托开启线程，`BeginInvoke`是异步，而`Invoke`是同步\)

```C#
var task = new Task(() => TaskMethod("Task 1"));
task.RunSynchronously();
```

##### async/await的实现方式

```c#
using System;
using System.Threading;
using System.Threading.Tasks;

namespace ConsoleApp1
{
    class Program
    {
        async static void AsyncFunction()
        {
            await Task.Delay(1);
            Console.WriteLine("使用`System.Threading.Tasks.Task`执行异步操作.");
            for (int i = 0; i < 10; i++)
            {
                Console.WriteLine(string.Format("AsyncFunction:i={0}", i));
            }
        }

        public static void Main()
        {
            Console.WriteLine("主线程执行业务处理.");
            AsyncFunction();
            Console.WriteLine("主线程执行其他处理");
            for (int i = 0; i < 10; i++)
            {
                Console.WriteLine(string.Format("Main:i={0}", i));
            }
            Console.ReadLine();
        }
    }
}
```

#### 2.1.2 带返回值的方式

##### 方式4:

```C#
Task<int> task = CreateTask("Task 1");
task.Start(); 
int result = task.Result;
```

```c#
using System;
using System.Threading;
using System.Threading.Tasks;

namespace ConsoleApp1
{
    class Program
    {
        static Task<int> CreateTask(string name)
        {
            return new Task<int>(() => TaskMethod(name));
        }

        static void Main(string[] args)
        {
            TaskMethod("Main Thread Task");
            Task<int> task = CreateTask("Task 1");
            task.Start();
            int result = task.Result;
            Console.WriteLine("Task 1 Result is: {0}", result);

            task = CreateTask("Task 2"); 
            task.RunSynchronously(); //该任务会运行在主线程中
            result = task.Result;
            Console.WriteLine("Task 2 Result is: {0}", result);

            task = CreateTask("Task 3");
            Console.WriteLine(task.Status);
            task.Start();

            while (!task.IsCompleted)
            {
                Console.WriteLine(task.Status);
                Thread.Sleep(TimeSpan.FromSeconds(0.5));
            }

            Console.WriteLine(task.Status);
            result = task.Result;
            Console.WriteLine("Task 3 Result is: {0}", result);

            #region 常规使用方式
            //创建任务
            Task<int> getsumtask = new Task<int>(() => Getsum());
            //启动任务,并安排到当前任务队列线程中执行任务(System.Threading.Tasks.TaskScheduler)
            getsumtask.Start();
            Console.WriteLine("主线程执行其他处理");
            getsumtask.Wait(); //等待任务的完成执行过程
            Console.WriteLine("任务执行结果：{0}", getsumtask.Result.ToString());//获得任务的执行结果
            #endregion
        }

        static int TaskMethod(string name)
        {
            Console.WriteLine("Task {0} is running on a thread id {1}. Is thread pool thread: {2}",
                name, Thread.CurrentThread.ManagedThreadId, Thread.CurrentThread.IsThreadPoolThread);
            Thread.Sleep(TimeSpan.FromSeconds(2));
            return 42;
        }

        static int Getsum()
        {
            int sum = 0;
            Console.WriteLine("使用`Task`执行异步操作.");
            for (int i = 0; i < 100; i++)
            {
                sum += i;
            }
            return sum;
        }
    }
}
```

```c#
using System;
using System.Threading.Tasks;

namespace ConsoleApp1
{
    class Program
    {
        public static void Main()
        {
            var ret1 = AsyncGetsum();
            Console.WriteLine("主线程执行其他处理");
            for (int i = 1; i <= 3; i++)
                Console.WriteLine("Call Main()");
            int result = ret1.Result;     //阻塞主线程
            Console.WriteLine("任务执行结果：{0}", result);
        }

        async static Task<int> AsyncGetsum()
        {
            await Task.Delay(1);
            int sum = 0;
            Console.WriteLine("使用`Task`执行异步操作.");
            for (int i = 0; i < 100; i++)
            {
                sum += i;
            }
            return sum;
        }
    }
}
```

### 2.2　线程等待、延续和组合

#### 2.2.1 Task的线程等待和延续主要以下几类：

 *    Wait：针对单个Task的实例，可以task1.wait进行线程等待
 *    WaitAny：线程列表中任何一个线程执行完毕即可执行（阻塞主线程）
 *    WaitAll：线程列表中所有线程执行完毕方可执行（阻塞主线程）
 *    WhenAny：与ContinueWith配合,线程列表中任何一个执行完毕，则继续ContinueWith中的任务（开启新线程，不阻塞主线程）
 *    WhenAll：与ContinueWith配合,线程列表中所有线程执行完毕，则继续ContinueWith中的任务（开启新线程，不阻塞主线程）
 *    ContinueWith：与WhenAny或WhenAll配合使用
 *    ContinueWhenAny：等价于Task的WhenAny+ContinueWith
 *    ContinueWhenAll：等价于Task的WhenAll+ContinueWith

```c#
public static void Main()
{
    //创建一个任务
    Task<int> task = new Task<int>(() =>
    {
        int sum = 0;
        Console.WriteLine("使用`Task`执行异步操作.");
        for (int i = 0; i < 100; i++)
        {
            sum += i;
        }
        return sum;
    });
    //启动任务,并安排到当前任务队列线程中执行任务(System.Threading.Tasks.TaskScheduler)
    task.Start();
    Console.WriteLine("主线程执行其他处理");
    //任务完成时执行处理。
    Task cwt = task.ContinueWith(t =>
    {
        Console.WriteLine("任务完成后的执行结果：{0}", t.Result.ToString());
    });
    task.Wait();
    cwt.Wait();
    
    Action<string,int> log = (name,time) =>
    {
        Console.WriteLine($"{name}任务开始...");
        Thread.Sleep(time);
        Console.WriteLine($"{name}任务结束!");
    };
    List<Task> tasks = new List<Task>
    {
        Task.Run(() => log("张三",3000)),
        Task.Run(() => log("李四",1000)),
        Task.Run(() => log("王五",2000))
    };
    //以下语句逐个测试效果
    Task.WaitAny(tasks.ToArray());
    Task.WaitAll(tasks.ToArray());
    Task.WhenAny(tasks.ToArray()).ContinueWith(x => Console.WriteLine("某个Task执行完毕"));
    Task.WhenAll(tasks.ToArray()).ContinueWith(x => Console.WriteLine("所有Task执行完毕"));
    Task.Factory.ContinueWhenAny(tasks.ToArray(), x => Console.WriteLine("某个Task执行完毕"));
    Task.Factory.ContinueWhenAll(tasks.ToArray(), x => Console.WriteLine("所有Task执行完毕"));
    Console.Read();
}
```

#### 2.2.2 任务的串行

```c#
static void Main(string[] args)
{
    ConcurrentStack<int> stack = new ConcurrentStack<int>();

    //t1先串行
    var t1 = Task.Factory.StartNew(() =>
    {
        stack.Push(1);
        stack.Push(2);
    });

    //t2,t3并行执行
    var t2 = t1.ContinueWith(t =>
    {
        int result;
        stack.TryPop(out result);
        Console.WriteLine("Task t2 result={0},Thread id {1}", result, Thread.CurrentThread.ManagedThreadId);
    });

    //t2,t3并行执行
    var t3 = t1.ContinueWith(t =>
    {
        int result;
        stack.TryPop(out result);
        Console.WriteLine("Task t3 result={0},Thread id {1}", result, Thread.CurrentThread.ManagedThreadId);
    });

    //等待t2和t3执行完
    Task.WaitAll(t2, t3);

    //t4串行执行
    var t4 = Task.Factory.StartNew(() =>
    {
        Console.WriteLine("当前集合元素个数：{0},Thread id {1}", stack.Count, Thread.CurrentThread.ManagedThreadId);
    });
    t4.Wait();
}
```

#### 2.2.3 子任务

```c#
public static void Main()
{
    Task<string[]> parent = new Task<string[]>(state =>
    {
        Console.WriteLine(state);
        string[] result = new string[2];
        //创建并启动子任务
        new Task(() => { result[0] = "我是子任务1"; }, TaskCreationOptions.AttachedToParent).Start();
        new Task(() => { result[1] = "我是子任务2"; }, TaskCreationOptions.AttachedToParent).Start();
        return result;
    }, "我是父任务，并在我的处理过程中创建多个子任务，所有子任务完成以后我才会结束执行");
    //任务完成后执行
    parent.ContinueWith(t =>
    {
        Array.ForEach(t.Result, r => Console.WriteLine(r));
    });    
    parent.Start(); //启动父任务
    parent.Wait();//等待任务结束Wait只能等待父线程结束,没办法等到父线程的ContinueWith结束
    Console.ReadLine();
}
```

#### 2.2.4 动态并行

`TaskCreationOptions.AttachedToParent`父任务等待所有子任务完成后整个任务才算完成

```c#
class Node
{
    public Node Left { get; set; }
    public Node Right { get; set; }
    public string Text { get; set; }
}

class Program
{
    static Node GetNode()
    {
        Node root = new Node
        {
            Left = new Node
            {
                Left = new Node{ Text = "L-L" },
                Right = new Node{ Text = "L-R" },
                Text = "L"
            },
            Right = new Node
            {
                Left = new Node{ Text = "R-L" },
                Right = new Node{ Text = "R-R" },
                Text = "R"
            },
            Text = "Root"
        };
        return root;
    }

    static void Main(string[] args)
    {
        Node root = GetNode();
        DisplayTree(root);
    }

    static void DisplayTree(Node root)
    {
        var task = Task.Factory.StartNew(() => DisplayNode(root),
                                        CancellationToken.None,
                                        TaskCreationOptions.None,
                                        TaskScheduler.Default);
        task.Wait();
    }

    static void DisplayNode(Node current)
    {

        if (current.Left != null)
            Task.Factory.StartNew(() => DisplayNode(current.Left),
                                        CancellationToken.None,
                                        TaskCreationOptions.AttachedToParent,
                                        TaskScheduler.Default);
        if (current.Right != null)
            Task.Factory.StartNew(() => DisplayNode(current.Right),
                                        CancellationToken.None,
                                        TaskCreationOptions.AttachedToParent,
                                        TaskScheduler.Default);
        Console.WriteLine("当前节点的值为{0};处理的ThreadId={1}", current.Text, Thread.CurrentThread.ManagedThreadId);
    }
}
```

### 2.3　取消任务

```c#
private static int TaskMethod(string name, int seconds, CancellationToken token)
{
    Console.WriteLine("Task {0} 正在运行,当前线程id {1}. Is thread pool thread: {2}",
        name, Thread.CurrentThread.ManagedThreadId, Thread.CurrentThread.IsThreadPoolThread);
    for (int i = 0; i < seconds; i++)
    {
        Thread.Sleep(TimeSpan.FromSeconds(1));
        if (token.IsCancellationRequested) return -1;
    }
    return 42 * seconds;
}

private static void Main(string[] args)
{
    var cts = new CancellationTokenSource();
    var longTask = new Task<int>(() => TaskMethod("Task 1", 10, cts.Token), cts.Token);
    Console.WriteLine(longTask.Status);
    cts.Cancel();
    Console.WriteLine(longTask.Status);
    Console.WriteLine("第一个任务在执行前已被取消");
    cts = new CancellationTokenSource();
    longTask = new Task<int>(() => TaskMethod("Task 2", 10, cts.Token), cts.Token);
    longTask.Start();
    for (int i = 0; i < 5; i++)
    {
        Thread.Sleep(TimeSpan.FromSeconds(0.5));
        Console.WriteLine(longTask.Status);
    }
    cts.Cancel();
    for (int i = 0; i < 5; i++)
    {
        Thread.Sleep(TimeSpan.FromSeconds(0.5));
        Console.WriteLine(longTask.Status);
    }

    Console.WriteLine("任务已完成,结果为 {0}.", longTask.Result);
}
```

### 2.4　处理异常

#### 2.4.1 单个任务

```c#
static int TaskMethod(string name, int seconds)
{
    Console.WriteLine("Task {0} is running on a thread id {1}. Is thread pool thread: {2}",
        name, Thread.CurrentThread.ManagedThreadId, Thread.CurrentThread.IsThreadPoolThread);
    Thread.Sleep(TimeSpan.FromSeconds(seconds));
    throw new Exception("Boom!");
    return 42 * seconds;
}

static void Main(string[] args)
{
    try
    {
        Task<int> task = Task.Run(() => TaskMethod("Task 2", 2));
        int result = task.GetAwaiter().GetResult();
        Console.WriteLine("Result: {0}", result);
    }
    catch (Exception ex)
    {
        Console.WriteLine("Task 2 Exception caught: {0}", ex.Message);
    }
    Console.WriteLine("----------------------------------------------");
    Console.ReadLine();
}
```

#### 2.4.2 多个任务

```c#
static int TaskMethod(string name, int seconds)
{
    Console.WriteLine("Task {0} is running on a thread id {1}. Is thread pool thread: {2}",
        name, Thread.CurrentThread.ManagedThreadId, Thread.CurrentThread.IsThreadPoolThread);
    Thread.Sleep(TimeSpan.FromSeconds(seconds));
    throw new Exception(string.Format("Task {0} Boom!", name));
    return 42 * seconds;
}

public static void Main(string[] args)
{
    try
    {
        var t1 = new Task<int>(() => TaskMethod("Task 3", 3));
        var t2 = new Task<int>(() => TaskMethod("Task 4", 2));
        var complexTask = Task.WhenAll(t1, t2);
        var exceptionHandler = complexTask.ContinueWith(t =>
                Console.WriteLine("Result: {0}", t.Result),
                TaskContinuationOptions.OnlyOnFaulted
            );
        t1.Start();
        t2.Start();
        Task.WaitAll(t1, t2);
    }
    catch (AggregateException ex)
    {
        ex.Handle(exception =>
        {
            Console.WriteLine(exception.Message);
            return true;
        });
    }
}
```

#### 2.4.3 async/await的方式

```c#
class Program
{
    static async Task ThrowNotImplementedExceptionAsync()
    {
        throw new NotImplementedException();
    }

    static async Task ThrowInvalidOperationExceptionAsync()
    {
        throw new InvalidOperationException();
    }

    static async Task Normal()
    {
        await Fun();
    }

    static Task Fun()
    {
        return Task.Run(() =>
        {
            for (int i = 1; i <= 10; i++)
            {
                Console.WriteLine("i={0}", i);
                Thread.Sleep(200);
            }
        });
    }

    static async Task ObserveOneExceptionAsync()
    {
        var task1 = ThrowNotImplementedExceptionAsync();
        var task2 = ThrowInvalidOperationExceptionAsync();
        var task3 = Normal();
        try
        {
            Task allTasks = Task.WhenAll(task1, task2, task3); //异步的方式
            await allTasks;
            //Task.WaitAll(task1, task2, task3); //同步的方式
        }
        catch (NotImplementedException ex)
        {
            Console.WriteLine("task1 任务报错!");
        }
        catch (InvalidOperationException ex)
        {
            Console.WriteLine("task2 任务报错!");
        }
        catch (Exception ex)
        {
            Console.WriteLine("任务报错!");
        }
    }

    public static void Main()
    {
        Task task = ObserveOneExceptionAsync();
        Console.WriteLine("主线程继续运行........");
        task.Wait();
    }
}
```

### 2.5　Task.FromResult

此方法创建一个`Task<TResult>`对象，该对象的`Task<TResult>.Result`属性为`result`，其`Status`属性为`RanToCompletion`。 当立即知道任务的返回值而不执行更长的代码路径时，通常使用方法。

```c#
class Program
{
    static IDictionary<string, string> cache = new Dictionary<string, string>()
    {
        {"0001","A"}, {"0002","B"}, {"0003","C"},
        {"0004","D"}, {"0005","E"}, {"0006","F"}
    };

    public static void Main()
    {
        Task<string> task = GetValueFromCache("0006");
        Console.WriteLine("主程序继续执行。。。。");
        string result = task.Result;
        Console.WriteLine("result={0}", result);
    }

    private static Task<string> GetValueFromCache(string key)
    {
        Console.WriteLine("GetValueFromCache开始执行。。。。");
        string result = string.Empty;
        //Task.Delay(5000);
        Thread.Sleep(5000);
        Console.WriteLine("GetValueFromCache继续执行。。。。");
        if (cache.TryGetValue(key, out result))
        {
            return Task.FromResult(result);
        }
        return Task.FromResult("");
    }
}
```

### 2.6　Factory.FromAsync

简`APM`模式（委托）转换为任务，`BeginXXX`和`EndXXX`

#### 2.6.1 带回调方式的

```c#
class Program
{
    private delegate string AsynchronousTask(string threadName);
    private static string Test(string threadName)
    {
        Console.WriteLine("开始...");
        Console.WriteLine("线程池是线程吗: {0}", Thread.CurrentThread.IsThreadPoolThread);
        Thread.Sleep(TimeSpan.FromSeconds(2));
        Thread.CurrentThread.Name = threadName;
        return string.Format("线程名称: {0}", Thread.CurrentThread.Name);
    }

    private static void Callback(IAsyncResult ar)
    {
        Console.WriteLine("开始一个回调...");
        Console.WriteLine("传递给callbak的状态: {0}", ar.AsyncState);
        Console.WriteLine("线程池是线程吗: {0}", Thread.CurrentThread.IsThreadPoolThread);
        Console.WriteLine("线程池工作线程id: {0}", Thread.CurrentThread.ManagedThreadId);
    }

    //执行的流程是:先执行Test--->Callback--->task.ContinueWith
    static void Main(string[] args)
    {
        AsynchronousTask d = Test;
        Console.WriteLine("Option 1");
        Task<string> task = Task<string>.Factory.FromAsync(
            d.BeginInvoke("AsyncTaskThread", Callback, "委托异步调用"), d.EndInvoke);
        task.ContinueWith(t => Console.WriteLine("完成回调, 现在继续! Result: {0}", t.Result));
        while (!task.IsCompleted)
        {
            Console.WriteLine(task.Status);
            Thread.Sleep(TimeSpan.FromSeconds(0.5));
        }
        Console.WriteLine(task.Status);
    }
}
```

#### 2.6.2 不带回调方式的

```c#
class Program
{
    private delegate string AsynchronousTask(string threadName);
    private static string Test(string threadName)
    {
        Console.WriteLine("开始...");
        Console.WriteLine("线程池是线程吗: {0}", Thread.CurrentThread.IsThreadPoolThread);
        Thread.Sleep(TimeSpan.FromSeconds(2));
        Thread.CurrentThread.Name = threadName;
        return string.Format("线程名称: {0}", Thread.CurrentThread.Name);
    }

    //执行的流程是:先执行Test--->task.ContinueWith
    static void Main(string[] args)
    {
        AsynchronousTask d = Test;
        Task<string> task = Task<string>.Factory.FromAsync(
            d.BeginInvoke, d.EndInvoke, "AsyncTaskThread", "委托异步调用");
        task.ContinueWith(t => Console.WriteLine("任务完成，现在运行一个延续! Result: {0}", t.Result));
        while (!task.IsCompleted)
        {
            Console.WriteLine(task.Status);
            Thread.Sleep(TimeSpan.FromSeconds(0.5));
        }
        Console.WriteLine(task.Status);
    }
}
```

#### 2.6.3 Task启动带参数和返回值的函数任务

##### 方法1

```c#
private int MyTest(object i)
{
    this.Invoke(new Action(() =>
    {
        pictureBox1.Visible = true;
    }));
    System.Threading.Thread.Sleep(3000);
    MessageBox.Show("hello:" + i);
    this.Invoke(new Action(() =>
    {
        pictureBox1.Visible = false;
    }));
    return 0;
}

private void Call()
{
    //Func<string, string> funcOne = delegate(string s){ return "fff"; };
    object i = 55;
    var t = Task<int>.Factory.StartNew(new Func<object, int>(MyTest), i);
}
```

##### 方法2

```c#
private async Task<int> MyTest(object i)
{
    this.Invoke(new Action(() =>
    {
        pictureBox1.Visible = true;
    }));

    HttpClient client = new HttpClient();
    var a = await client.GetAsync("http://www.baidu.com");
    Task<string> s = a.Content.ReadAsStringAsync();
    MessageBox.Show (s.Result);
    this.Invoke(new Action(() =>
    {
        pictureBox1.Visible = false;
    }));
    return 0;
}

async private void Call()
{
    object i = 55;
    var t = Task<Task<int>>.Factory.StartNew(new Func<object, Task<int>>(MyTest), i);
}
```

##### 方法3

```c#
private async void MyTest()
{
    this.Invoke(new Action(() =>
    {
        pictureBox1.Visible = true;
    }));
    HttpClient client = new HttpClient();
    var a = await client.GetAsync("http://www.baidu.com");
    Task<string> s = a.Content.ReadAsStringAsync();
    MessageBox.Show (s.Result);
    this.Invoke(new Action(() =>
    {
        pictureBox1.Visible = false;
    }));
}

private void Call()
{
    var t = Task.Run(new Action(MyTest));
    //相当于
    //Thread th= new Thread(new ThreadStart(MyTest));
    //th.Start();
}
```

### 2.7　使用IProgress

`IProgress<in T>`只提供了一个方法`void Report(T value)`，通过`Report`方法把一个`T`类型的值报告给`IProgress`，然后`IProgress<in T>`的实现类`Progress<in T>`的构造函数接收类型为`Action<T>`的形参，通过这个委托让进度显示在`UI`界面中。

```c#
class Program
{
    static void DoProcessing(IProgress<int> progress)
    {
        for (int i = 0; i <= 100; ++i)
        {
            Thread.Sleep(100);
            if (progress != null)
            {
                progress.Report(i);
            }
        }
    }

    static async Task Display()
    {
        //当前线程
        var progress = new Progress<int>(percent =>
        {
            Console.Clear();
            Console.Write("{0}%", percent);
        });
        //线程池线程
        await Task.Run(() => DoProcessing(progress));
        Console.WriteLine("");
        Console.WriteLine("结束");
    }

    public static void Main()
    {
        Task task = Display();
        task.Wait();
    }
}
```