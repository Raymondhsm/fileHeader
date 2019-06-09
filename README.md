# xiaomingHeader 

> 在vscode中用于生成文件头部注释和函数注释的插件。


## 简介

1. **文件头部添加注释**:
   
    * 在文件开头添加注释，记录文件信息
    * 若文件已有头部注释，调用时会更新
    * 快捷键：`window`：`ctrl+alt+i`,`mac`：`ctrl+cmd+i`

2. **在光标处添加函数头部参数注释**:

    * 在光标处自动生成一个注释模板，下方有例子
    * 快捷键：`window`：`ctrl+alt+o`,`mac`：`ctrl+cmd+o`
    * 快捷键不可用很可能是被占用了

3. **在光标处添加函数尾部注释**:

    * 在光标处自动生成一个注释模板，下方有例子
    * 若光标处[-3,10]行内已有尾部注释，会更新
    * 快捷键：`window`：`ctrl+alt+p`,`mac`：`ctrl+cmd+p`

## 安装

在 Vscode 扩展商店中搜索`xiaomingHeader`,点击安装即可。

## 配置
    * 默认配置:

    在用户首选项中搜索fileheader，默认配置为：

    "fileheader.userInfo": {} //设置你的名字