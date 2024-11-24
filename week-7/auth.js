const JWT_SECRET = 'getOut';

function auth(req, res, next) {
    const token = req.headers.token;
    try {
        user = jwt.verify(token, JWT_SECRET);
        req.userId = user.id;
        next();
    }
    catch {
        res.status(403).json({
            msg: "Please login to continue"
        });
    }
}

module.exports = {
    JWT_SECRET,
    auth
}