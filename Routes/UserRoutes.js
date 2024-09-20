const express = require("express")
const {register, registerfile, login, loginfile, logout} = require("../controller/usercontroller")
const {authenticateUser} = require("../Middleware/auth")

const userRouter = express.Router()

userRouter.post("/register",register)
userRouter.get("/register",registerfile)
userRouter.get("/login",loginfile)
userRouter.post("/login",login)
userRouter.get("/logout", authenticateUser, logout);


module.exports = userRouter