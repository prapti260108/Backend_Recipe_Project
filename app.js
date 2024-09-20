const express= require("express")
const db = require("./config/db")
const userRouter = require("./Routes/UserRoutes")
const ArticleRouter = require("./Routes/articleRoutes")
const cookieParser = require('cookie-parser');

const app = express()
app.use(express.json())

app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
app.set("view engine","ejs")

app.use("/User",userRouter)
app.use("/Articles", ArticleRouter)

app.get("/",(req,res)=>{
   res.render("navbar",{ user: req.user })
})

app.listen(9871,()=>{
    console.log("server is running on 9871")
})