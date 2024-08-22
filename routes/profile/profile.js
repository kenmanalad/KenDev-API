import express from "express"
import passport from "passport";
import multer from "multer";
import { check } from "express-validator";
import registerProfile from "../../controllers/profile/register-profile.js";
import { config } from "dotenv";


config();
const router = express.Router();

//Only the required fields need to be validated
let queryValidators = [
    check("firstName").isString().withMessage("Invalid input for first name."),
    check("lastName").isString().withMessage("Invalid input for last name."),
    check("userType").isString().withMessage("Invalid user type."),
]

//This is only temporary
//Files will be saved in S3 buckets after Sprint 20
const storage = multer.diskStorage({
    destination: (req, file, cb) => {

        cb(null,process.env.TEMP_URL_FOR_UPLOAD);
    },
    filename: (req, file, cb) => {

        let newProfilePicPath = `${Date.now()}${file.originalname}`
        cb(null,newProfilePicPath);
        
    }
});

const upload = multer({storage});

router.post("/profile-registration",
    passport.authenticate(
        "jwt",
        {session:false}
    ),
    upload.single('profilePic'),
    queryValidators
    ,registerProfile
);

export default router;