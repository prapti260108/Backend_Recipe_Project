
const express = require("express");
const { add, delet, articleForm, articleList, articleListfile, secondfile, MyarticlesFile } = require("../controller/articleController");
const { authenticateUser, isadmin } = require("../Middleware/auth");

const ArticleRouter = express.Router();

// Route definitions
ArticleRouter.post("/add", authenticateUser, add);  
ArticleRouter.get("/articleform", authenticateUser, articleForm); 
ArticleRouter.get("/articleList",authenticateUser, articleList);
ArticleRouter.get("/articallistfile", articleListfile);
ArticleRouter.get("/delete/:id", authenticateUser, isadmin, delet);
ArticleRouter.get("/Second", authenticateUser, secondfile);
ArticleRouter.get("/myArticles", authenticateUser, MyarticlesFile);

module.exports = ArticleRouter;
