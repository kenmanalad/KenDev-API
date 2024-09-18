import { QueryError } from "../../utils/shared/error-handlers/query-error.js";
import Course from "../../models/courses/course.js"

const fetchCourse = async (req,res) => {
    const { id } = req.body;

    try{
        const course = await Course.findByPk(id);

        if(!course){
            return res.status(400).json({
                success: false,
                message: "Unable to find associated course for this chapter.",
                course: null
            });
        }

        return res.status(200).json({
            success: true,
            message: "",
            course: course
        });

    }catch(error){
        QueryError(error, res);
    }
}

export default fetchCourse;