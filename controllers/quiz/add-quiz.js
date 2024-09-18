import Quiz from "../../models/quizzes/quiz.js";
import Chapter from "../../models/chapters/chapter.js";
import { QueryError } from "../../utils/shared/error-handlers/query-error.js";

const addQuiz = async (req, res) => {
    const { chapter_id, question } = req.body;

    try{
        const chapter = await Chapter.findByPk(chapter_id);

        if(!chapter){
            return res.status(400).json({
                success: false,
                message: "Unable to find associated chapter",
                quiz: null
            });
        }

        const quiz = await Quiz.create({
            question
        });

        if(!quiz){
            return res.status(400).json({
                success: false,
                message: "Unable to register course details: Try using valid inputs",
                course_id: ""
            });
        }

        await chapter.setQuiz(quiz);
        await chapter.save();

        return res.status(201).json({
            success: true,
            message: "",
            quiz: quiz,
        });

    }catch(error){
        console.error(error);
        QueryError(error, res);
    }

}

export default addQuiz;