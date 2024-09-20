const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
    const token = req.cookies ? req.cookies.authToken : null;
    if (!token) {
        return res.redirect('/user/login');
    }

    try {
        const decoded = jwt.verify(token, "privet-key");
        req.user = decoded;
        next();
    } catch (error) {
        res.redirect('/user/login');
    }
};

const isadmin = (req,res,next)=>{
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).send('Forbidden');
    }
}



module.exports = {authenticateUser,isadmin};
