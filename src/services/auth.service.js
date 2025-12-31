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
        user_id: user.user_id,
        expiresAt: Date.now() + ACCESS_TOKEN_TTL
    });

    refreshTokens.set(refreshToken, {
        user_id: user.user_id
    });

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
    const data = refreshTokens.get(refreshToken);
    if (!data) return null; // refresh token tidak valid

    if (Date.now() > data.expiresAt) {
        // hapus refresh token yang sudah expired
        refreshTokens.delete(refreshToken);
        return null;
    }

    // buat access token baru
    const newAccessToken = uuidv4();
    const accessTokenExpiresAt = Date.now() + 1000 * 60 * 60; // 1 jam
    accessTokens.set(newAccessToken, {
        userId: data.userId,
        expiresAt: accessTokenExpiresAt
    });

    return {
        accessToken: newAccessToken,
        expiresAt: new Date(accessTokenExpiresAt).toLocaleString("id-ID", {

        })
    };
}

function verifyAccessToken(token) {
    const data = accessTokens.get(token);
    if (!data) return null;

    if (Date.now() > data.expiresAt) {
        accessTokens.delete(token);
        return null;
    }

    return data.user_id;
}

module.exports = {
    login,
    refreshAccessToken,
    verifyAccessToken
};