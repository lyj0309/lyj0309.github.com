---
title: "Go Csv"
date: 2022-03-02T11:54:31+08:00
tags: ["Go"]
---

go提供了一个读取库encoding

```go
package main

import (
	"encoding/csv"
	"log"
	"os"
)

//go语言读写csv文件


func main()  {
   //创建一个io对象
   filename:="Person1.csv"
f :=  ReadCsv(filename)
   //WriterCSV(filename)

}

//csv文件读取
func ReadCsv(filepath string) *[][]string {
	//打开文件(只读模式)，创建io.read接口实例
	opencast,err:=os.Open(filepath)
	if err!=nil{
		log.Println("csv文件打开失败！")
	}
	defer opencast.Close()

	//创建csv读取接口实例
	reader:=csv.NewReader(opencast)

	//获取一行内容，一般为第一行内容
	//read,_:=reader.Read() //返回切片类型：[chen  hai wei]
	//log.Println(read)

	//读取所有内容
	ReadAll,err:=reader.ReadAll()//返回切片类型：[[s s ds] [a a a]]
	log.Println(ReadAll)
	return &ReadAll

	/*
	  说明：
	   1、读取csv文件返回的内容为切片类型，可以通过遍历的方式使用或Slicer[0]方式获取具体的值。
	   2、同一个函数或线程内，两次调用Read()方法时，第二次调用时得到的值为每二行数据，依此类推。
	   3、大文件时使用逐行读取，小文件直接读取所有然后遍历，两者应用场景不一样，需要注意。
	*/


}
//csv文件写入
func WriterCSV(path string)  {

	//OpenFile读取文件，不存在时则创建，使用追加模式
	File,err:=os.OpenFile(path,os.O_RDWR|os.O_APPEND|os.O_CREATE,0666)
	if err!=nil{
		log.Println("文件打开失败！")
	}
	defer File.Close()

	//创建写入接口
	WriterCsv:=csv.NewWriter(File)
    str:=[]string{"chen1","hai1","wei1"} //需要写入csv的数据，切片类型

	//写入一条数据，传入数据为切片(追加模式)
	err1:=WriterCsv.Write(str)
	if err1!=nil{
		log.Println("WriterCsv写入文件失败")
	}
	WriterCsv.Flush() //刷新，不刷新是无法写入的
	log.Println("数据写入成功...")
}
```

