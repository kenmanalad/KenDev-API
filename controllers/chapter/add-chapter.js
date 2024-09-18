import Chapter from "../../models/chapters/chapter.js";
import Course from "../../models/courses/course.js";
import { QueryError } from "../../utils/shared/error-handlers/query-error.js";

const addChapter = async (req,res) => {
    const { title, body, example, course_id} = req.body;


    try{
        const course = await Course.findByPk(course_id);


        if(!course){
            return res.status(400).json({
                success:false,
                message: "Unable to find the associated course",
                id: null
            });
        }

        const chapter = await Chapter.create({
            title,
            body,
            example,
        });

        if(!chapter){
            return res.status(400).json({
                success: false,
                message: "Unable to register course details: Try using valid inputs",
                course_id: ""
            });
        }


        await course.setChapters(chapter);
        await course.save();

        return res.status(201).json({
            success: true,
            message:"",
            id: chapter.id
        });

    }catch(error){
        QueryError(error, res);
    }

}
 export default addChapter;