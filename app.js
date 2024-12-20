const express= require("express")
const db = require("./config/db")
const userRouter = require("./Routes/UserRouter.js")
const recipeRouter = require("./Routes/recipeRoutes.js")
const cookieParser = require('cookie-parser');

const app = express()
app.use(express.json())

app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
app.set("view engine","ejs")

app.use("/user",userRouter)
app.use("/recipes", recipeRouter)

app.get("/",(req,res)=>{
   res.render("navbar",{ user: req.user })
})

app.listen(8878,()=>{
    console.log("server is running on 8878")
})