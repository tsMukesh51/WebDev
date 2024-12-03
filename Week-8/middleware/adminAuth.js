const jwt = require('jsonwebtoken');
const { adminModel } = require('../db');

require('dotenv').config();

async function adminAuth(req, res, next) {
    const token = req.headers.token;
    try {
        const adminJWT = jwt.verify(token, process.env.JWT_ADMIN_SECRET);
        const adminMN = await adminModel.findOne({
            _id: adminJWT.id
        });
        if (adminMN == null) {
            res.json({
                msg: 'Invalid Token,  Please login again'
            });
            return;
        }
        req.body.admin = adminMN;
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
    adminAuth: adminAuth
}