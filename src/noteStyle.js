

const noteFileData = (time,config) => {
    let data = "/* \n"
    data += " * Author:      xiaoming \n"
    data += " * CreateTime:  "+ time +" \n"
    data += " * LastEditor:  "+ config.userInfo.name +" \n"
    data += " * LastTime:    "+ new Date().toLocaleString() +" \n"
    data += " * Description: \n"
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

const noteAuthorData = (time,config) => {
    let data = "/* \n"
    //功能暂定
    // data += " * Author:      xiaoming \n"
    // data += " * CreateTime:  "+ time +" \n"
    data += " * LastEditor:  "+config.userInfo.name+" \n"
    data += " * ModifyTime:  "+ new Date().toLocaleString() +" \n"
    data += " * Description: \n"
    data += "*/ \n"

    return data
}

module.exports = {
    noteFileData,
    noteFunData,
    noteAuthorData
}