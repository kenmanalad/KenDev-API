import { config } from "dotenv";
import jwt from 'jsonwebtoken';

config();
export const generateToken= (id) => {
    const token = jwt.sign(
        id,
        process.env.SECRET,
        {
            expiresIn:'1d'
        }
    );

    return token;
}
