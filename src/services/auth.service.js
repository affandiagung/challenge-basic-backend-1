const { v4: uuidv4 } = require('uuid');
const { users, accessTokens, refreshTokens } = require('../data/store');
const jwt = require('jsonwebtoken');

const ACCESS_TOKEN_TTL = "7h";
const REFRESH_TOKEN_TTL = "7d";


function generateTokens(data) {
    const accessToken = jwt.sign(
        { user_id: data.user_id, email: data.email },
        process.env.JWT_SECRET,
        { expiresIn: ACCESS_TOKEN_TTL }
    )

    const refreshToken = jwt.sign(
        { user_id: data.user_id, email: data.email },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: REFRESH_TOKEN_TTL }
    );

    return { accessToken, refreshToken };
}


function login(email, password) {
    const user = users.find(user => user.email === email && user.password === password);

    if (!user) return null;

    const { accessToken, refreshToken } = generateTokens(user);

    return {
        user: {
            user_id: user.user_id,
            email: user.email,
            name: user.name
        },
        accessToken,
        refreshToken
    }
}

function refreshAccessToken(refreshToken) {
    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        return jwt.sign(
            { user_id: decoded.user_id },
            process.env.JWT_SECRET,
            { expiresIn: ACCESS_TOKEN_TTL }
        );
    } catch (err) {
        console.log("Refresh token Not valid")
        return null;
    }
}

function verifyAccessToken(token) {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        console.log("Token invalid atau expired");
        return null;
    }
}

module.exports = {
    login,
    refreshAccessToken,
    verifyAccessToken
};