const ArticleModel = require("../Model/article")

const add = async(req,res)=>{

    try {
        if (!req.user || !req.user.id) {
            return res.status(400).send({ message: 'User not authenticated' });
        }

        const articleData = await ArticleModel.create({
            title: req.body.title,
            content: req.body.content,
            author: req.user.id 
        });

        res.redirect("myArticles")
        console.log("Article data added:", articleData);
    } catch (error) {
        res.status(400).send({ message: error.message });
        console.error("Error adding article:", error);
    }
}
const articleList = async (req, res) => {
    try {
        const articaldata = await ArticleModel.find(); 
        const user = req.user || null; 
        res.render('articleList', { articaldata, user });
    } catch (error) {
        console.error("Error fetching articles:", error);
        res.status(500).send({ message: "Error fetching articles", error });
    }
};


const delet = async (req, res) => {
    try {
        await ArticleModel.findByIdAndDelete(req.params.id);
        const articaldata = await ArticleModel.find();

        res.render('articleList', { articaldata, user: req.user });
        console.log("Article data deleted successfully");
    } catch (error) {
        res.status(400).send({ message: error.message });
        console.error("Error deleting article:", error);
    }
};


const articleForm = async(req,res)=>{
    res.render('articleForm', { user: req.user });
}
const articleListfile = async(req,res)=>{
    res.render('articleList', { user: req.user });
}
const secondfile = async(req,res)=>{
    res.render('Second', { user: req.user });
}

const MyarticlesFile = async (req, res) => {
    try {
        const userArticles = await ArticleModel.find({ author: req.user.id });
        res.render('myArticles', { articles: userArticles, user: req.user });
    } catch (error) {
        console.error("Error fetching user's articles:", error);
        res.status(500).send({ message: "Error fetching user's articles", error });
    }
};


module.exports={
    add,
    delet,
    articleForm,
    articleList,
    articleListfile,
    secondfile,
    MyarticlesFile
}