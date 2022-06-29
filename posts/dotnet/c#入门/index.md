# C#入门


# c#入门

## 打印
```c#
int a = 1
Console.WriteLine($"a is {a}")
```
<!-- ## 整数和浮点数 -->
## 分支和循环
### if
```c#
int a = 5;
int b = 3;
if (a + b > 10)
{
    Console.WriteLine("The answer is greater than 10");
}
else
{
    Console.WriteLine("The answer is not greater than 10");
}
```
### for

```c#
for (int index = 0; index < 10; index++)
{
    Console.WriteLine($"Hello World! The index is {index}");
}

var names = new List<string> { "<name>", "Ana", "Felipe" };
foreach (var name in names)
{
    Console.WriteLine($"Hello {name.ToUpper()}!");
}

```
## 列表集合
```c#
var names = new List<string> { "Tom", "Ana", "Felipe" };

```
### 修改内容
```c#
var names = new List<string> { "Tom", "Ana", "Felipe" };
names.Add("Bob")
names.Remove("Bob")
```

### 搜索
如果不存在，则返回`-1`
```c#
var index = names.IndexOf("Felipe");
```

###  排序
 `Sort` 方法按正常顺序（如果是字符串则按字母顺序）对列表中的所有项进行排序。 在程序底部添加以下代码：
`names.Sort();`




