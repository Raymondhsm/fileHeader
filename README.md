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

## 特性
* 提供智能识别函数参数数量，以自动生成“@param”的数量
* 当满足以下条件时，光标在函数头上一行、函数头仅占一行、参数被最后一个“（）”包括，会触发该功能。
* 暂时仅能识别一般类型（void fun(...)）
* 如果出现不可忍受的bug可以在 __配置中"fileheader.projectSetting":{"paramNumIntelligence": true}设置为false__，也可以反馈一下
* @param和@return智能生成：函数头注释存在时，调用生成函数头注释只会生成当前相同的名称。如当前行为@param，则再次调用后只会在下一行生成@param，方便多个参数需要备注的情况

## 安装

在 Vscode 扩展商店中搜索`xiaomingHeader`,点击安装即可。

## 配置
    * 默认配置:

    在用户首选项中搜索fileheader，默认配置为：

    "fileheader.userInfo": {} //设置你的名字