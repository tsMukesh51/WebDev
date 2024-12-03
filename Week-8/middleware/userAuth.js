const jwt = require('jsonwebtoken');
const { userModel } = require('../db');

require('dotenv').config();

async function userAuth(req, res, next) {
    const token = req.headers.token;
    try {
        const userJWT = jwt.verify(token, process.env.JWT_SECRET);
        const userMN = await userModel.findOne({
            _id: userJWT.id
        });
        if (userMN == null) {
            res.json({
                msg: 'Invalid Token,  Please login again'
            });
            return;
        }
        req.body.user = userMN;
        next();
    } catch (err) {
        console.log(err);
        if (err.name === 'JsonWebTokenError') {
            res.status(401).json({
                msg: 'Invalid token, Please login again'
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