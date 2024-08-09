import { config } from "dotenv";
import jwt from 'jsonwebtoken'
config();
export const getUserData = async (access_token)  => {
    try{
        const response = await fetch(
            `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
        );

        const data = await response.json();

        if(response.ok){
            return {
                success:true,
                message:"",
                data: data,
                status:response.status
            };
        }

        return {
            success:false,
            message:"Unable to complete request : Failed to get user details from API",
            data: null,
            status:response.status
        };

    }catch(error){
        console.error("Unable to complete request : Failed to get user details from API",error);

        return {
            success:false,
            message:"Unable to complete request : Please try again later",
            data: null,
            status:400
        }
        
    }
}


