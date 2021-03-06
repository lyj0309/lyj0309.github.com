---
title: "C#多线程"
date: 2022-06-24T11:48:10+08:00
---
## 一、引言
最近在设计模式的一些内容，主要的参考书籍是《Head First 设计模式》，同时在学习过程中也查看了很多博客园中关于设计模式的一些文章的，在这里记录下我的一些学习笔记，一是为了帮助我更深入地理解设计模式，二同时可以给一些初学设计模式的朋友一些参考。首先我介绍的是设计模式中比较简单的一个模式——单例模式（因为这里只牵涉到一个类）

## 二、单例模式的介绍
说到单例模式,大家第一反应应该就是——什么是单例模式？，从“单例”字面意思上理解为——一个类只有一个实例，所以单例模式也就是保证一个类只有一个实例的一种实现方法罢了(设计模式其实就是帮助我们解决实际开发过程中的方法, 该方法是为了降低对象之间的耦合度,然而解决方法有很多种,所以前人就总结了一些常用的解决方法为书籍,从而把这本书就称为设计模式)，下面给出单例模式的一个官方定义：确保一个类只有一个实例,并提供一个全局访问点。为了帮助大家更好地理解单例模式,大家可以结合下面的类图来进行理解,以及后面也会剖析单例模式的实现思路:


## 三、为什么会有单例模式
看完单例模式的介绍,自然大家都会有这样一个疑问——为什么要有单例模式的？它在什么情况下使用的？从单例模式的定义中我们可以看出——单例模式的使用自然是当我们的系统中某个对象只需要一个实例的情况，例如:操作系统中只能有一个任务管理器,操作文件时,同一时间内只允许一个实例对其操作等,既然现实生活中有这样的应用场景,自然在软件设计领域必须有这样的解决方案了(因为软件设计也是现实生活中的抽象)，所以也就有了单例模式了。

## 四、剖析单例模式的实现思路
了解完了一些关于单例模式的基本概念之后，下面就为大家剖析单例模式的实现思路的，因为在我自己学习单例模式的时候，咋一看单例模式的实现代码确实很简单，也很容易看懂，但是我还是觉得它很陌生（这个可能是看的少的，或者自己在写代码中也用的少的缘故），而且心里总会这样一个疑问——为什么前人会这样去实现单例模式的呢？他们是如何思考的呢？后面经过自己的琢磨也就慢慢理清楚单例模式的实现思路了，并且此时也不再觉得单例模式陌生了，下面就分享我的一个剖析过程的：

我们从单例模式的概念（确保一个类只有一个实例,并提供一个访问它的全局访问点）入手，可以把概念进行拆分为两部分：（1）确保一个类只有一个实例；（2）提供一个访问它的全局访问点；下面通过采用两人对话的方式来帮助大家更快掌握分析思路：


----------------------------------

菜鸟：怎样确保一个类只有一个实例了？

老鸟：那就让我帮你分析下，你创建类的实例会想到用什么方式来创建的呢？

新手：用new关键字啊，只要new下就创建了该类的一个实例了，之后就可以使用该类的一些属性和实例方法了

老鸟：那你想过为什么可以使用new关键字来创建类的实例吗？

菜鸟：这个还有条件的吗？........., 哦，我想起来了，如果类定义私有的构造函数就不能在外界通过new创建实例了（注：有些初学者就会问，有时候我并没有在类中定义构造函数为什么也可以使用new来创建对象，那是因为编译器在背后做了手脚了，当编译器看到我们类中没有定义构造函数，此时编译器会帮我们生成一个公有的无参构造函数）

老鸟：不错，回答的很对，这样你的疑惑就得到解答了啊

菜鸟：那我要在哪里创建类的实例了？

老鸟：你傻啊，当然是在类里面创建了（注：这样定义私有构造函数就是上面的一个思考过程的，要创建实例，自然就要有一个变量来保存该实例把，所以就有了私有变量的声明,但是实现中是定义静态私有变量,朋友们有没有想过——这里为什么定义为静态的呢?对于这个疑问的解释为：每个线程都有自己的线程栈，定义为静态主要是为了在多线程确保类有一个实例）

菜鸟：哦，现在完全明白了，但是我还有另一个疑问——现在类实例创建在类内部，那外界如何获得该的一个实例来使用它了？

老鸟：这个，你可以定义一个公有方法或者属性来把该类的实例公开出去了（注：这样就有了公有方法的定义了，该方法就是提供方法问类的全局访问点）

## 代码实现（加锁版本）
```c#
/// <summary>
    /// 单例模式的实现
    /// </summary>
    public class Singleton
    {
        // 定义一个静态变量来保存类的实例
        private static Singleton uniqueInstance;

        // 定义一个标识确保线程同步
        private static readonly object locker = new object();

        // 定义私有构造函数，使外界不能创建该类实例
        private Singleton()
        {
        }

        /// <summary>
        /// 定义公有方法提供一个全局访问点,同时你也可以定义公有属性来提供全局访问点
        /// </summary>
        /// <returns></returns>
        public static Singleton GetInstance()
        {
            // 当第一个线程运行到这里时，此时会对locker对象 "加锁"，
            // 当第二个线程运行该方法时，首先检测到locker对象为"加锁"状态，该线程就会挂起等待第一个线程解锁
            // lock语句运行完之后（即线程运行完之后）会对该对象"解锁"
            // 双重锁定只需要一句判断就可以了
            if (uniqueInstance == null)
            {
                lock (locker)
                {
                    // 如果类的实例不存在则创建，否则直接返回
                    if (uniqueInstance == null)
                    {
                        uniqueInstance = new Singleton();
                    }
                }
            }
            return uniqueInstance;
        }
    }
    ```