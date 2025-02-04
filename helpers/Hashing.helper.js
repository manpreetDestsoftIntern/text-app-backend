const crypto = require('crypto');
require('dotenv').config();

const salt = process.env.SALT
// const salt="2e4499b64bc6b571bbdfd3afb4b27d5b"

// Generate a salt (you can store this in the database alongside the hash)
function generateSalt() {
    return crypto.randomBytes(16).toString('hex');
}

// Hash password using PBKDF2 (with salt)
function hashPassword(password, iterations = 100000, keylen = 64, digest = 'sha512') {
    return new Promise((resolve, reject) => {
        crypto.pbkdf2(password, salt, iterations, keylen, digest, (err, derivedKey) => {
            if (err) reject(err);
            resolve(derivedKey.toString('hex'));
        });
    });
}

// Verify the password by comparing the hashes
async function verifyPassword(storedHash, password) {
    const hashedPassword = await hashPassword(password);
    return storedHash === hashedPassword;
}

module.exports = { hashPassword, verifyPassword };
