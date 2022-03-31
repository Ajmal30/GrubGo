const jwt = require("jsonwebtoken");
const User = require("../schemas/User");

async function IsAuthenticated(req, res, next) {
    try {
        const authToken = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(authToken, process.env.ENCRYPTION_STRING);
        if(decoded) {
            const user = await User.findById(decoded.user.id);
            req.user = {
                id: decoded.user.id,
                username: user.username,
                email: user.email,
                role: user.role
            };
        }
    } catch(e) {
        res.status(500).json({
            message: "Access denied. Please try again."
        })
    }
    next();
}

module.exports = {
    IsAuthenticated
}