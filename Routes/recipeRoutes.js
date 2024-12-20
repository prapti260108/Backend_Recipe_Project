const express = require("express");
const { add, delet, recipeForm, recipeList, recipeListfile, secondfile, MyrecipesFile, editRecipeForm, updateRecipe } = require("../controller/RecipeController");
const { authenticateUser, isadmin } = require("../Middleware/auth");

const recipeRouter = express.Router();

// Route definitions
recipeRouter.post("/add", authenticateUser, add);  
recipeRouter.get("/recipeform", authenticateUser, recipeForm); 
recipeRouter.get("/recipeList", authenticateUser, recipeList);
recipeRouter.get("/recipelistfile", recipeListfile);
recipeRouter.get("/delete/:id", authenticateUser, isadmin, delet);
recipeRouter.get("/Second", authenticateUser, secondfile);
recipeRouter.get("/myrecipes", authenticateUser, MyrecipesFile);
recipeRouter.get("/edit/:id", authenticateUser, editRecipeForm);

recipeRouter.post("/edit/:id", authenticateUser, updateRecipe); // POST to handle form submission

module.exports = recipeRouter;