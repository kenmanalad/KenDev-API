import express from "express";
import passport from "passport";
import addCourse from "../../controllers/course/add-course.js";
import fetchAll from "../../controllers/course/fetch-all.js";
import multer from "multer";
import { config } from "dotenv";

config();

//This is only temporary
//Files will be saved in S3 buckets after Sprint 20

const storage = multer.diskStorage({
    destination: (req, file, cb) => {

        cb(null,process.env.TEMP_URL_FOR_UPLOAD);
    },
    filename: (req, file, cb) => {

        let newCoursePicPath = `${Date.now()}${file.originalname}`
        cb(null,newCoursePicPath);
        
    }
});

const router = express.Router();

const upload = multer({storage});

router.post(process.env.ADD_COURSE_ROUTE, 
    upload.single('coursePic'),
    addCourse
);

router.get("/fetch-course",
    passport.authenticate(
        "jwt",
        {session:false}
    )
    ,fetchAll
);

export default router;