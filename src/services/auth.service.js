const { v4: uuidv4 } = require('uuid');
const { users, accessTokens, refreshTokens } = require('../data/store');

const ACCESS_TOKEN_TTL = 3600 * 1000 // 1 jam

function login(email, password) {
    const user = users.find(user => user.email === email && user.password === password);

    if (!user) return null;

    const accessToken = uuidv4();

    // ini bisa digunakan untuk testing
    // const accessToken = "ac3c8ea9-3124-4a76-bcda-e50743de5fdc";

    const refreshToken = uuidv4();

    accessTokens.set(accessToken, {
        userId: user.id,
        expiresAt: Date.now() + ACCESS_TOKEN_TTL
    });

    accessTokens.set(accessToken, {
        userId: user.id,
        expiresAt: Date.now() + ACCESS_TOKEN_TTL,
    });

    refreshTokens.set(refreshToken, {
        userId: user.id
    });

    return {
        user: {
            id: user.id,
            email: user.email,
            name: user.name
        },
        accessToken,
        refreshToken
    }
}

function refreshAccessToken(refreshToken) {
    const data = refreshTokens.get(refreshToken);
    if (!data) return null;

    if (Date.now() > data.expiresAt) {
        accessTokens.delete(token);
        return null
    }

    return data.userId
}

function verifyAccessToken(token) {
    const data = accessTokens.get(token);
    if (!data) return null;

    if (Date.now() > data.expiresAt) {
        accessTokens.delete(token);
        return null;
    }

    return data.userId;
}

module.exports = {
    login,
    refreshAccessToken,
    verifyAccessToken
};