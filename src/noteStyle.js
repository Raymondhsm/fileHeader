
const updateFileHeader = (config) => {
    let info = {
        LastEditor: config.userInfo.name,
        //EditorRange: check.EditorRange,
        ModifyTime: new Date().toLocaleString()
        //ModifyTimeRange: check.ModifyTimeRange
    }

    let data = {
        LastEditor: " * LastEditor:  "+ info.LastEditor,
        //EditorRange: check.EditorRange,
        ModifyTime: " * ModifyTime:  "+ info.ModifyTime 
        //ModifyTimeRange: check.ModifyTimeRange
    }

    return data
} 

const insertFileHeader = (time,config) => {
    let info = {
        Author: config.userInfo.name,
        CreateTime: time,
        LastEditor: config.userInfo.name,
        ModifyTime: new Date().toLocaleString(),
        Description: ""
    }

    let data = "/* File Info \n"
    data += " * Author:      "+ info.Author +" \n"
    data += " * CreateTime:  "+ info.CreateTime +" \n"
    data += " * LastEditor:  "+ info.LastEditor +" \n"
    data += " * ModifyTime:  "+ info.ModifyTime +" \n"
    data += " * Description: "+ info.Description +"\n"
    data += "*/ \n"

    return data
}

const noteFunData = () => {
    let data = "/* \n"
    data += " * @Description: \n"
    data += " * @param: \n"
    data += " * @return: \n"
    data += "*/ \n"

    return data
}

const insertAuthorNote = (time,config) => {
    let data = "/* Function Info \n"
    //功能暂定
    data += " * Author:      "+ config.userInfo.name +" \n"
    data += " * CreateTime:  "+ time +" \n"
    data += " * LastEditor:  "+config.userInfo.name+" \n"
    data += " * ModifyTime:  "+ new Date().toLocaleString() +" \n"
    data += " * Description: \n"
    data += "*/ \n"

    return data
}

const updateAuthorNote = (config) => {
    let info = {
        LastEditor: config.userInfo.name,
        ModifyTime: new Date().toLocaleString()
    }

    let data = {
        LastEditor: " * LastEditor:  "+ info.LastEditor,
        ModifyTime: " * ModifyTime:  "+ info.ModifyTime 
    }

    return data
}

const startStyle = () => {
    return "/*"
}

const endStyle = () => {
    return "*/"
}

module.exports = {
    updateFileHeader,
    insertFileHeader,
    noteFunData,
    insertAuthorNote,
    updateAuthorNote,
    startStyle,
    endStyle
}