const RecipeModel = require("../Model/recipe")

const add = async (req, res) => {
    try {
        // Log to check if 'steps' and 'ingredients' are in the request body
        console.log(req.body);

        if (!req.user || !req.user.id) {
            return res.status(400).send({ message: 'User not authenticated' });
        }

        const recipeData = await RecipeModel.create({
            title: req.body.title,
            steps: req.body.steps,
            ingredients: req.body.ingredients,
            author: req.user.id 
        });

        res.redirect("myrecipes");
        console.log("recipe data added:", recipeData);
    } catch (error) {
        res.status(400).send({ message: error.message });
        console.error("Error adding recipe:", error);
    }
};

const recipeList = async (req, res) => {
    try {
        const recipedata = await RecipeModel.find(); 
        const user = req.user || null; 
        res.render('recipeList', { recipedata, user });
    } catch (error) {
        console.error("Error fetching recipe:", error);
        res.status(500).send({ message: "Error fetching recipe", error });
    }
};


const delet = async (req, res) => {
    try {
        await RecipeModel.findByIdAndDelete(req.params.id);
        const recipedata = await RecipeModel.find();

        res.render('recipeList', { recipedata, user: req.user });
        console.log("recipe data deleted successfully");
    } catch (error) {
        res.status(400).send({ message: error.message });
        console.error("Error deleting recipe:", error);
    }
};


const recipeForm = async(req,res)=>{
    res.render('recipeForm', { user: req.user });
}
const recipeListfile = async(req,res)=>{
    res.render('recipeList', { user: req.user });
}
const secondfile = async(req,res)=>{
    res.render('Second', { user: req.user });
}

const MyrecipesFile = async (req, res) => {
    try {
        const userrecipes = await RecipeModel.find({ author: req.user.id });
        console.log(userrecipes); // Log to check if steps and ingredients are available
        res.render('myrecipes', { recipes: userrecipes, user: req.user });
    } catch (error) {
        console.error("Error fetching user's recipe:", error);
        res.status(500).send({ message: "Error fetching user's recipe", error });
    }
};
const editRecipeForm = async (req, res) => {
    try {
        const recipe = await RecipeModel.findById(req.params.id); // Fetch recipe by ID
        if (!recipe) {
            return res.status(404).send({ message: 'Recipe not found' });
        }

        // Check if the user is an admin or the author of the recipe
        if (req.user.role !== 'admin' && recipe.author.toString() !== req.user.id) {
            return res.status(403).send({ message: 'You are not authorized to edit this recipe' });
        }

        // Render the edit form with the recipe data
        res.render('editRecipeForm', { recipe, user: req.user });
    } catch (error) {
        console.error('Error fetching recipe for editing:', error);
        res.status(500).send({ message: 'Error fetching recipe for editing' });
    }
};

const updateRecipe = async (req, res) => {
    try {
        const { title, steps, ingredients } = req.body;
        const recipe = await RecipeModel.findById(req.params.id);

        if (!recipe) {
            return res.status(404).send({ message: 'Recipe not found' });
        }

        // Check if the user is an admin or the author of the recipe
        if (req.user.role !== 'admin' && recipe.author.toString() !== req.user.id) {
            return res.status(403).send({ message: 'You are not authorized to edit this recipe' });
        }

        // Update the recipe data
        recipe.title = title;
        recipe.steps = steps;
        recipe.ingredients = ingredients;

        await recipe.save(); // Save the updated recipe

        res.redirect("/recipes/myrecipes"); // Redirect to the user's recipes page (or another page as needed)
    } catch (error) {
        console.error('Error updating recipe:', error);
        res.status(500).send({ message: 'Error updating recipe' });
    }
};




module.exports={
    add,
    delet,
    recipeForm,
    recipeList,
    recipeListfile,
    secondfile,
    MyrecipesFile,
    editRecipeForm,
    updateRecipe
}