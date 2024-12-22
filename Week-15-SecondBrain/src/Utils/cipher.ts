import crypto from 'crypto'

export const encryptUserId = (userId: string) => {
    if (!process.env.SHRD_SECRET)
        return null;
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(process.env.SHRD_SECRET, 'utf-8'), Buffer.from(process.env.SHRD_SECRET.slice(0, 16), 'utf-8'));
    let encrypted = cipher.update(userId, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

export const decryptUserId = (encryptedData: string) => {
    if (!process.env.SHRD_SECRET)
        return null;
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(process.env.SHRD_SECRET, 'utf-8'), Buffer.from(process.env.SHRD_SECRET.slice(0, 16), 'utf-8'));
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}
