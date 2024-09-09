import User from "../../models/user.js";
import Profile from "../../models/profile/profile.js";
import { validationResult } from 'express-validator';



const registerProfile = async(req, res) => {

    //Only validates the required fields
    const errors = validationResult(req);
    if (!errors.isEmpty()) {

        return res.status(400).json(
            {
                success: false, 
                message: errors.array() 
            }
        );
        
    }

    const {
        firstName, 
        lastName, 
        user_id, 
        userType,
        nonITCareer,
        ITCareer,
        school,
        schoolYear
    } = req.body
    
    try{

        //Retrieve user through id
        const user = await User.findByPk(user_id);

        console.log(req?.file?.destination);

        //req.file can be  null
        //Users can have no profile pic
        const profilePic =   `/temp_upload/profile/${req?.file?.filename}`;
        const  imgUrl = profilePic ?? null;


        if(!user){
            return res.status(401).json(
                {
                    success: false,
                    message: "Unable to complete registration request: User cannot be found"
                }
            );
        }

        // Register profile details
        const profile = await Profile.create({
            firstName,
            lastName,
            imgUrl,
            userType,
            nonITCareer,
            ITCareer,
            school,
            schoolYear
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
                message: "Successful Profile Registration"
            }
        )


    }catch(err){
        if (err.name === 'SequelizeValidationError') {

            console.error("Validation Error: Invalid input data.", err.errors);
            return res.status(401).json(
                {
                    success:false,
                    message:"Inputs are invalid. Kindly enter valid inputs",
                }
            );

        } else if (err.name === 'SequelizeDatabaseError') {

            console.error("Database Error: There was an issue with the database operation.", err);
            return res.status(500).json(
                {
                    success:false,
                    id: null,
                    message:"Server has an issue as of the moment. Please try again later"
                }
            );

        } else {

            console.error("Unexpected Error: Failed to process registration.", err);
            return res.status(400).json(
                {
                    success:false,
                    id: null,
                    message:"There is an unexpected issue/s in our system. Please contact an agent for assistance.",
                }
            );

        }
        

    }

}

export default registerProfile;