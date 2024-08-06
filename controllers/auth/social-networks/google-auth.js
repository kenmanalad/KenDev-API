import { config } from "dotenv";
import jwt from 'jsonwebtoken'
config();
export const getUserData = async (access_token)  => {
    try{
        const response = await fetch(
            `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
        );

        if(response.ok){
            const data = await response.json();
            return data;
        }
    }catch(error){
        console.error("Error in getting user data",error);
    }
}


