import { config } from "dotenv"

config();

export const getAccessToken = async (code) =>{
    try{
        const params = `?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}&code=${code}`;
        const response = await fetch(process.env.GITHUB_GET_ACCESS_TOKEN_URL + params,
            {
                method: "POST",
                headers: {
                    "Accept":"application/json"
                }
            }
        );

        if(response.ok){
            const data = await response.json();
            return data;
        }
    }catch(error){
        throw new Error("Error occured while getting user data through github auth",error);
    }
}

export const getUserData = async (access_token) => {
    try{

        const response = await fetch(process.env.GITHUB_GET_USER_DATA_URL,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            }
        );

        if(response.ok){
            const data = await response.json();
            return data;
        }

    }catch(error){
        throw new Error("Error occured while accessing data in github");
    }

}
