import User from "../../models/user.js";
import { QueryError } from "../../utils/shared/error-handlers/query-error.js";

const fetchProfile = async (req,res) => {

    const userId = req.body.user_id; 

    if(!userId){
        return res.status(400).json(
            {
                error: false,
                profile: null,
                message: "Failed to fetch profile details. Kindly try signing in again!"
            }
        );
    }

    try{

        const userDetails = await User.findByPk(userId);


        if(!userDetails){
            return res.status(400).json(
                {
                    success: false,
                    profile: null,
                    messsage: "Unable to associate user to a profile. Kindly try signing in again!"
                }
            );
        }

        const profile = await userDetails.getProfile();


        if(!profile){
            return res.status(400).json(
                {
                    success: false,
                    profile: null,
                    message: "Unable to find profile data for this user. Kindly try signing in again"
                }
            );
        }

        res.status(200).json(
            {
                success: true,
                profile: profile,
                message: ""
            }
        );




    }catch(error){
        // Returns appropriate error statuses and messages
        // For different types of database-related errors
        QueryError(error, res);
    }

    

}

export default fetchProfile;