import User from "../../models/user.js";
import Profile from "../../models/profile/profile.js";


const registerProfile = async(req, res) => {

    const {firstName, lastName, user_id} = req.body

    try{

        //Retrieve user through id
        const user = await User.findByPk(user_id);

        if(!user){
            return res.status(401).json(
                {
                    success: false,
                    message: "Unable to complete registration request: User cannot be found"
                }
            );
        }

        //Register profile details
        const profile = await Profile.create({
            firstName,
            lastName
        });

        if(!profile){
            return res.status(401).json(
                {
                    success: false,
                    message: "Unable to complete registration request: Failed to register profile"
                }
            );
        }

        //Associate Profile to User
        await user.setProfile(profile)
        await user.save();


        return res.status(200).json(
            {
                success: true,
                message: ""
            }
        )


    }catch(err){
        if (err.name === 'SequelizeValidationError') {

            console.error("Validation Error: Invalid input data.", err.errors);
            return res.status(401).json(
                {
                    success:false,
                    message:"Unable to process authentication request: Inputs are invalid.",
                }
            );

        } else if (err.name === 'SequelizeDatabaseError') {

            console.error("Database Error: There was an issue with the database operation.", err);
            return res.status(500).json(
                {
                    success:false,
                    id: null,
                    message:"Unable to process authentication request: Server has an issue as of the moment.",
                    status: 500
                }
            );

        } else {

            console.error("Unexpected Error: Failed to process registration.", err);
            return res.status(400).json(
                {
                    success:false,
                    id: null,
                    message:"Unable to process authentication request. Please try again later.",
                    status: 400
                }
            );

        }
        

    }

}

export default registerProfile;