import Course from "../../models/courses/course.js"
import { QueryError } from "../../utils/shared/error-handlers/query-error.js";
const fetchAll = async  (req, res) => {
    try{


        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const offset = (page - 1) * limit;

        const courses = await Course.findAndCountAll({
            limit: limit,
            offset: offset
        });

        if(!courses){
            return res.status(400).json({
                success: false,
                message: "Unable to fetch any courses. Please try reloading the page.",
                totalPage: null,
                courses: null
            });
        }

        console.log(page);
        return res.status(200).json({
            success: true,
            message: "",
            totalPage: Math.ceil(courses.count / limit),
            courses: courses.rows
        });

    }catch(error){

        //Returns necessary error message for a specific error type
        QueryError(error, res)
    }

}

export default fetchAll;