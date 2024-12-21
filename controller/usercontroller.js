const usermodel = require("../Model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
    try {
        // Create a new user, password is automatically hashed via the pre-save hook in the model
        const userdata = await usermodel.create(req.body);
        res.redirect("/user/login");
        console.log("SignUp successfully", userdata);
    } catch (error) {
        res.status(500).send({ message: "Error registering user", error });
    }
};

const registerfile = async (req, res) => {
    res.render("register", { user: req.user });
};

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        let userdata = await usermodel.findOne({ username });
        if (!userdata) {
            return res.status(404).send({ message: "User not found" });
        }

        // Compare entered password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, userdata.password);
        if (!isMatch) {
            return res.status(401).send({ message: "Password does not match" });
        }

        let payload = {
            username: userdata.username,
            role: userdata.role,
            id: userdata._id
        };
        const token = jwt.sign(payload, "privet-key");

        // Set the auth token in the cookie
        res.cookie('authToken', token, { httpOnly: true });
        res.redirect("/recipes/second");
    } catch (error) {
        res.status(500).send({ message: "Error logging in", error });
    }
};

const loginfile = async (req, res) => {
    res.render("login", { user: req.user });
};

const second = async (req, res) => {
    try {
        // Logic for your second route
        res.send("This is the second route!");
    } catch (error) {
        res.status(500).send({ message: "Error in second route", error });
    }
};

const logout = async (req, res) => {
    if (!req.user || !req.user.id) {
        return res.status(400).send({ message: 'User not authenticated' });
    }

    // Optionally, you can also remove the user from the database if desired, though typically you do not delete users on logout.
    await usermodel.findByIdAndDelete(req.user.id);

    res.clearCookie('authToken');
    res.redirect('/');
    console.log("User logged out and data deleted successfully");
};

module.exports = {
    register,
    registerfile,
    login,
    loginfile,
    logout,
    second
};
