

const noteData = (time) =>{
    let data = "/* \n"
    data += " * Author:      xiaoming \n"
    data += " * CreateTime:  "+ time +" \n"
    data += " * LastEditor:  xiaoming \n"
    data += " * LastTime:    "+ new Date().toLocaleString() +" \n"
    data += " * Description: "
    data += "*/ \n"

    console.log(data)
    return data
}

module.exports = {
    noteData

}