//nodeexam
//mongodb+srv://virugamahelly:nodeexam@cluster0.0vuiu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0


const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://virugamahelly:nodeexam@cluster0.0vuiu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")


const db = mongoose.connection;

db.on('connected',(req,res)=>{
    console.log("database is connected")
})

module.exports = db




