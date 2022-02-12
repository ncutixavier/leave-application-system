import jwt from 'jsonwebtoken';
import 'dotenv/config';

const secret = process.env.JWT_SECRET;

export const generateToken = (payload, expiresIn ) => {
    const token = jwt.sign({ ...payload }, secret, { expiresIn });
    return token;
};

export const decodeToken = async (token) => {
    const decoded = await jwt.verify(token, secret);
    return decoded;
};