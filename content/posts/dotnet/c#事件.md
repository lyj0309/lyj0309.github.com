---
title: "c#事件"
date: 2022-06-24T11:48:10+08:00
---

## Demo 事件声明完整格式
顾客-customer进入餐馆点菜（触发事件），服务员-waiter（收到事件并处理）
```c#


namespace Exception
{
    class Program
    {
        static void Main(string[] args)
        {

            Customer customer = new();
            Waiter waiter = new();

            customer.Order += waiter.Action;
            customer.Action();
            customer.PayTheBill();
        }
    }

    internal class Waiter
    {
        internal void Action(Customer customer, OrderEventArgs e)
        {
            Console.WriteLine("I will service the dish {0}",e.DishName);
            double price = 10;
            switch (e.Size)
            {
                case "smaill":
                  price *= 0.5;
                    break;                
                case "big":
                  price = price * 5;
                    break;

            }
            customer.Bill = price;
        }
    }
    //委托声明，默认需要加EventHandler
    public delegate void OrderEventHandler(Customer customer, OrderEventArgs e);

    //继承自委托参数基类
     public class OrderEventArgs:EventArgs
    {
        public string DishName { get; set; }

        public string Size { get; set; }


    }

    public class Customer
    {
        private OrderEventHandler orderEventHander;
        //事件声明
        public event OrderEventHandler Order
        {
            add
            {
                orderEventHander += value;
            }
            remove
            {
                orderEventHander -= value;
            }
        }
        public double Bill { get; set; }

        public void PayTheBill()
        {
            Console.WriteLine("i wall pay ${0}", this.Bill);
        }


        public void Think()
        {
            for (int i = 0; i < 5; i++)
            {
                Console.WriteLine("think.....");
            }
            if (this.orderEventHander != null)
            {
                OrderEventArgs e = new()
                {
                    DishName = "hongshaorou",
                    Size = "big"
                };
                //执行事件event
                orderEventHander.Invoke(this, e);

            }
        }
        public void Action()
        {
            Think();

        }
    }
}
```

## 事件声明简单模式
```c#

        public event OrderEventHandler Order;
```
完整模式
```c#
        private OrderEventHandler orderEventHander;
        public event OrderEventHandler Order
        {
            add
            {
                orderEventHander += value;
            }
            remove
            {
                orderEventHander -= value;
            }
        }
```
可以看到，`orderEventHander`这个属性已经没有了，变成了order,易有歧义

## 为啥有委托了还要事件



为了权限管控，防止滥用或者误用
```c#
            Customer customer = new();
            Waiter waiter = new();

            customer.Order += waiter.Action;

            OrderEventArgs e = new()
            {
                DishName = "pijiuyu",
                Size = "small"
            };
            Customer badGuy = new();
            badGuy.Order += waiter.Action;

            //**************
            badGuy.Order.Invoke(customer, e);
            //**************

            customer.PayTheBill();
```
声明的事件，只能使用`+`或`-`操作符，但是委托可以直接调用方法
如上，若声明成委托，则直接可以调用别人的事件


### 事件的本质是委托字段的一个包装器
+ 这个包装器对委托字段的访问起限制作用，相当于一个“蒙板
+ 封装（encapsulation)的一个重要功能就是隐藏
+ 事件对外界隐藏了委托实例的大部分功能，仅暴露添加/移除事件处理器的功能
### 用于声明事件的委托类型的命名约定
+ 用于声明Foo事件的委托，一般命名为FooEventHandler(除非是一个非常通用的事件约束）
+ FooEventHandler委托的参数一般有两个（由Win32API演化而来，历史悠久）
第一个是object类型，名字为sender,实际上就是事件的拥有者、事件的source。
第二个是EventArgs类的派生类，类名一般为FooEventArgs,参数名为e。也就是前面讲过的事件参数
+ 虽然没有官方的说法，但我们可以把委托的参数列表看做是事件发生后发送给事件响应者的“事件消息”
+ 触发Foo事件的方法一般命名为OnFoo,即“因何引发”、“事出有因”
访问级别为protected,不能为public,不然又成了可以“借刀杀人”了
### 事件的命名约定
+ 带有时态的动词或者动词短语
+ 事件拥有者“正在做”什么事情，用进行时；事件拥有者“做完了“什么事情，用完成时

## 事件与委托的关系
### 事件真的是"以特殊方式声明的委托字段/实例"吗？
不是！只是声明的时候“看起来像”（对比委托字段与事件的简化声明，field-like)

事件声明的时候使用了委托类型，简化声明造成事件看上去像一个委托的字段（实例）,而event关键字则更像是一个修饰符——这就是错觉的来源之
订阅事件的时候+=操作符后面可以是一个委托实例，这与委托实例的赋值方法语法相同，这也让事件看起来像是一个委托字段——这是错觉的又一来源

重申：事件的本质是加装在委托字段上的一个“蒙板”（mask),是个起掩蔽作用的包装器。这个用于阻挡非法操作的“蒙板”绝不是委托字段本身

### 为什么要使用委托类型来声明事件？
站在source的角度来看，是为了表明source能对外传递哪些消息

站在subscriber的角度来看，它是一种约定，是为了约束能够使用什么样签名的方法来处理（响应）事件
委托类型的实例将用于存储（引用）事件处理器
## 对比事件与属性
属性不是字段——很多时候属性是字段的包装器，这个包装器用来保护字段不被滥用

事件不是委托字段——它是委托字段的包装器，这个包装器用来保护委托字段不被滥用

包装器永远都不可能是被包装的东西