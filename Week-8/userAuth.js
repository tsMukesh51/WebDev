const jwt = require('jsonwebtoken');
const { userModel } = require('./db');

require('dotenv').config();

async function userAuth(req, res, next) {
    const token = req.headers.token;
    try {
        const userJWT = jwt.verify(token, process.env.JWT_SECRET);
        const userMN = userModel.findOne({
            _id: userJWT._id
        });
        req.body.user = userMN;
        next();
    } catch (err) {
        console.log(err);
        if (err.name === 'JsonWebTokenError') {
            res.status(401).json({
                msg: 'Invalid token, Please Login again'
            });
        } else if (err.name === 'TokenExpiredError') {
            res.status(401).json({
                msg: 'Token has expired, Please login again'
            });
        } else {
            res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }
}

module.exports = {
    userAuth: userAuth
}