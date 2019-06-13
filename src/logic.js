let vscode = require("vscode");
let style = require("./noteStyle");

const checkFileHasHeader = () => {

    let document = vscode.window.activeTextEditor.document
    let inNote = false //判断是否在注释里面
    let annotationStarts = "/*" //获取注释样式
    let annotationEnds = "*/"
    let totalLine = document.lineCount - 1; // 总行数

    let data = {
        hasHeader : false,
        EditorRange : null,
        ModifyRange : null,
        //Description: ""
    }

    for (let i = 0; i < 20; i++) {
        // 只遍历前20行没有文件头部注释内容即退出
        let linetAt = document.lineAt(i); // 获取每行内容
        let lineNoTrim = linetAt.text; // line 
        let line = linetAt.text.trim();

        if(!inNote){
            //不在注释里就遍历下一行
            let str = line.split(" ")
            if(str.length >= 3){
                if (annotationStarts === str[0] && str[1] === "File" && str[2] === "Info") {
                    inNote = true;
                }
            }
        }else{
            //退出注释
            if (annotationEnds === line || annotationEnds === lineNoTrim) {
                inNote = false;
            }

            //分割
            let str = line.split(":");
            let key, value;
            if(str.length >= 2){
                key = str[0].substr(1).trim()
                value = str[1].trim() 
            }
            console.log(key + "\t" + value);

            let range = linetAt.range;
            //识别
            if(key === "LastEditor") {
                data.EditorRange = range;
                data.hasHeader = true
            }
            else if(key === "ModifyTime") {
                data.ModifyRange = range
                data.hasHeader = true
            }
        }
        if (totalLine === i) break; // 行数不够则退出循环
    }

    return data;
}

const checkLine = (lineNum) => {
    let document = vscode.window.activeTextEditor.document
    let linetAt = document.lineAt(lineNum); // 获取每行内容
    let lineNoTrim = linetAt.text; // line 
    let line = linetAt.text.trim();

    //判断当前行的前缀
    let str = line.split("@")
    console.log(str)
    if(str.length >= 2){
        if(str[0] === "* " && str[1].startsWith("param")){
            return {
                isHas : true,
                value : "param"
            }
        }
        else if(str[0] === "* " && str[1].startsWith("return")){
            return {
                isHas : true,
                value : "return"
            }
        }
    }

    return {
        isHas : false,
        value : ""
    }
}

const checkFunHasTail = (lineNum) => {
    let document = vscode.window.activeTextEditor.document
    let inNote = false //判断是否在注释里面
    let annotationStarts = "/*" //获取注释样式
    let annotationEnds = "*/"
    let totalLine = document.lineCount - 1; // 总行数

    let data = {
        hasTail : false,
        EditorRange : null,
        ModifyRange : null
    }

    for (let i = lineNum>3?lineNum-3:0 ; i <= lineNum + 10; i++) {
        // 只遍历[line-3,line+10]行没有文件头部注释内容即退出
        let linetAt = document.lineAt(i); // 获取每行内容
        let lineNoTrim = linetAt.text; // line 
        let line = linetAt.text.trim();

        if(!inNote){
            //不在注释里就遍历下一行
            let str = line.split(" ")
            if(str.length >= 3){
                if (annotationStarts === str[0] && str[1] === "Function" && str[2] === "Info") {
                    inNote = true;
                }
            }
        }else{
            //退出注释
            if (annotationEnds === line || annotationEnds === lineNoTrim) {
                inNote = false;
            }

            //分割
            let str = line.split(":");
            let key, value;
            if(str.length >= 2){
                key = str[0].substr(1).trim()
                value = str[1].trim() 
            }
            console.log(key + "\t" + value);

            let range = linetAt.range;
            //识别
            if(key === "LastEditor") {
                data.EditorRange = range;
                data.hasTail = true
            }
            else if(key === "ModifyTime") {
                data.ModifyRange = range
                data.hasTail = true
            }
        }
        //如果找完就回去
        if(data.EditorRange != null && data.ModifyRange != null)break;
        if (totalLine === i) break; // 行数不够则退出循环
    }

    return data;
}

/* 
 * @Description: 寻找函数头的参数数量
 * @param: 行号
 * @return: 参数数量
*/ 
const findFunctionParamNum = (line) => {
    let document = vscode.window.activeTextEditor.document
     
    let linetAt = document.lineAt(line); // 获取每行内容
    let lineText = linetAt.text; // line 

    //识别行内是否有括号
    let hasbracket = lineText.indexOf("(")
    if(hasbracket == -1) return -1;

    //利用左括号分割函数头
    let strLeft = lineText.split("(")
    let strMid

    //如果小于2代表没有左括号，没参数，返回0
    if(strLeft.length < 2)return 0
    else if(strLeft.length >= 2) strMid = strLeft[strLeft.length - 1]

    //若以右括号开头代表括号内没参数，返回0
    if(strMid.startsWith(")"))return 0
    let strRight = strMid.split(")")[0]
    let num = strRight.split(",").length

    return num

}

module.exports={
    checkFileHasHeader,
    checkLine,
    checkFunHasTail,
    findFunctionParamNum
}