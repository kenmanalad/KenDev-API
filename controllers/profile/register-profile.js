import User from "../../models/user.js";
import Profile from "../../models/profile/profile.js";
import { validationResult } from 'express-validator';
import { QueryError } from "../../utils/shared/error-handlers/query-error.js";



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
        schoolYear,
        collegeProgram
    } = req.body
    
    try{

        //Retrieve user through id
        const user = await User.findByPk(user_id);

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
            schoolYear,
            collegeProgram
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


        return res.status(201).json(
            {
                success: true,
                message: "Successful Profile Registration"
            }
        )


    }catch(err){
        // Returns appropriate error statuses and messages
        // For different types of database-related errors
        QueryError(err);
    }

}

export default registerProfile;