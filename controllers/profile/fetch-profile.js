import User from "../../models/user.js";

const fetchProfile = async (req,res) => {

    const userId = req.body.user_id; 

    console.log( req.body );

    if(!userId){
        res.status(400).json(
            {
                error: false,
                profile: null,
                message: "Failed to fetch profile details. Kindly try signing in again!"
            }
        );
    }

    try{

        const userDetails = await User.findByPk(userId);

        console.log(userDetails);


        if(!userDetails){
            res.status(400).json(
                {
                    success: false,
                    profile: null,
                    messsage: "Unable to associate user to a profile. Kindly try signing in again!"
                }
            );
        }

        const profile = await userDetails.getProfile();

        console.log(profile);

        if(!profile){
            res.status(400).json(
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

    }

    

}

export default fetchProfile;