import { config } from "dotenv"

config();

export const getAccessToken = async(code,url,params,contentType) => {

    if(!code){
        return {
            success: false,
            access_token:null,
            message: "Failed to process request due to incomplete data. Please try again later",
            status: 400
        }
    };


    try{

        const response = await fetch(`${url}?${params}`,
            {
                method:"POST",
                headers: contentType,
            }
        );
    
        
        const data = await response.json();

        console.log(data);

        if(response.ok){

            return {
                success:true,
                access_token: data.access_token,
                message: "",
                status: response.status
            };
            
        }

        else{

            return {
                success: false,
                access_token: null,
                message: `Failed to access the token. Response Status: ${response.status}`,
                status: response.status
            }

        }

    }catch(error){

        return {
            success: false,
            access_token:null,
            message: "Unable to complete request. Please Try again later",
            status: 400
        }

    }
    
}

export const getUserData = async (access_token, url) => {

    if(!access_token) {
        return {
            success: false,
            data: null,
            message: "Failed to process request due to incomplete data. Please try again later",
            status: 400
        }
    
    };

    try{

        const response = await fetch(url,
            {
                method:"GET",
                headers:{
                    Authorization : `Bearer ${access_token}`
                }
            }
        );


        if(response.ok){

            const data = await response.json();

            console.log(data);

            return {
                success: true,
                message: "",
                data:data,
                status: response.status
            };
        }
        else{
            return {
                success: false,
                data:null,
                message: `Failed to access the user credentials. Response Status: ${response.status}`,
                status: response.status
            }
        }

    }catch(error){

        return {
            success: false,
            data: null,
            message: "Unable to complete request. Please Try again later",
            status: 400
        }

    }

}
