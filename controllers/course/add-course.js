import Course from "../../models/courses/course.js";
import { QueryError } from "../../utils/shared/error-handlers/query-error.js";

const addCourse = async (req,res) => {
    console.log(req.body);
    const { name, description, tech_stack, level} = req.body;


    const imgURL =   `/temp_upload/profile/${req?.file?.filename}`;
    const  coursePic = imgURL ?? null;

    try{
        const course = await Course.create({
            name,
            description,
            tech_stack,
            level,
            coursePic
        });

        if(!course){
            return res.status(400).json({
                success: false,
                message: "Unable to register course details: Try using valid inputs",
                course_id: ""
            });
        }
        return res.status(201).json({
            success: true,
            message: "",
            course_id: course.id
        });

    }catch(error){
        QueryError(error, res);
    }

}
 export default addCourse;