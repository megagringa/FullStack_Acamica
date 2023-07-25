const jwt = require("jsonwebtoken");
const { signature } = require('../config/config');

function generateToken(info) {
    const token = jwt.sign(info, signature);
    return token;
}

function validateTokenJWT(token) {
    try {
        const decoded = jwt.verify(token, signature);
        return decoded;
    } catch (error) {
        return false;
    }
}

module.exports = { generateToken, validateTokenJWT }