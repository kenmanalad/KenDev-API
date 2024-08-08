import { config } from "dotenv";

config();

export const getUserData = async (access_token) => {

    if(!access_token) {
        return {
            error: true,
            message: "Failed to process request due to incomplete data. Please try again later",
            status: 400
        }
    
    };

    try{

        const response = await fetch(process.env.LINKEDIN_GET_USER_DATA_URL,
            {
                method:"GET",
                headers:{
                    Authorization : `Bearer ${access_token}`
                }
            }
        );


        if(response.ok){

            const data = await response.json();

            return data;
        }
        else{
            return {
                error: true,
                message: `Failed to access the user credentials. Response Status: ${response.status}`,
                status: response.status
            }
        }

    }catch(error){

        return {
            error: true,
            message: "Unable to complete request. Please Try again later",
            status: 400
        }

    }

}
export const getAccessToken = async(code) => {

    if(!code){
        return {
            error: true,
            message: "Failed to process request due to incomplete data. Please try again later",
            status: 400
        }
    };

    const params = `?client_secret=${process.env.LINKEDIN_CLIENT_SECRET}&` + 
        `client_id=${process.env.LINKEDIN_CLIENT_ID}&` +
        `redirect_uri=${process.env.LINKEDIN_REDIRECT_URI}&` +
        `grant_type=${process.env.LINKEDIN_GRANT_TYPE}&` +
        `code=${code}`;

    try{

        const response = await fetch(process.env.LINKEDIN_GET_ACCESS_TOKEN_URL + params,
            {
                method:"POST",
                headers:{
                    "Content-Type":"x-www-form-urlencoded"
                },
            }
        );
    
        if(response.ok){

            const data = await response.json();

            return data.access_token;
            
        }

        else{

            return {
                error: true,
                message: `Failed to access the token. Response Status: ${response.status}`,
                status: response.status
            }

        }

    }catch(error){

        return {
            error: true,
            message: "Unable to complete request. Please Try again later",
            status: 400
        }

    }
    
}

