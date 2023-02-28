---
title: "c# 切片"
date: 2023-02-23T11:48:10+08:00
---

1. 提取 arr 前3个元素
如果用 linq 的话，可以用 Take(3)，用切片操作的话就是 [0..3]， 代码如下：
```c#
        static void Main(string[] args)
        {
            var myarr = new string[] { "10", "20", "30", "40", "50", "60", "70", "80", "90", "100" };

            //1. 获取数组 前3个元素
            var query1 = myarr[0..3];

            var query2 = myarr.Take(3).ToList();

            Console.WriteLine($"query1={string.Join(",", query1)}");
            Console.WriteLine($"query2={string.Join(",", query2)}");
        }
```
2. 提取 arr 最后三个元素
这个怎么提取呢？在 python 中直接用 -3 表示就可以了，在C# 中需要用 ^ 来表示从末尾开始，代码如下：
```c#
        static void Main(string[] args)
        {
            var myarr = new string[] { "10", "20", "30", "40", "50", "60", "70", "80", "90", "100" };

            //1. 获取数组 最后3个元素
            var query1 = myarr[^3..];

            var query2 = myarr.Skip(myarr.Length - 3).ToList();

            Console.WriteLine($"query1={string.Join(",", query1)}");
            Console.WriteLine($"query2={string.Join(",", query2)}");
        }
```

3. 提取 array 中index = 4，5，6 的三个位置元素
用 linq 的话，就需要使用 Skip + Take 双组合，如果用切片操作的话就太简单了。。。
```c#
        static void Main(string[] args)
        {
            var myarr = new string[] { "10", "20", "30", "40", "50", "60", "70", "80", "90", "100" };

            //1. 获取数组 中 index=4,5,6 三个位置的元素
            var query1 = myarr[4..7];

            var query2 = myarr.Skip(4).Take(3).ToList();

            Console.WriteLine($"query1={string.Join(",", query1)}");
            Console.WriteLine($"query2={string.Join(",", query2)}");
        }
```
从上面的切割区间 [4..7] 的输出结果来看，这是一个 左闭右开 的区间，所以要特别注意一下。

4. 获取 array 中倒数第三和第二个元素
从要求上来看就是获取元素 80 和 90，如果你理解了前面的两个用法，我相信这个你会很快的写出来，代码如下：

```c#
        static void Main(string[] args)
        {
            var myarr = new string[] { "10", "20", "30", "40", "50", "60", "70", "80", "90", "100" };

            //1. 获取 array 中倒数第三和第二个元素
            var query1 = myarr[^3..^1];

            var query2 = myarr.Skip(myarr.Length - 3).Take(2).ToList();

            Console.WriteLine($"query1={string.Join(",", query1)}");
            Console.WriteLine($"query2={string.Join(",", query2)}");
        }
```