import { config } from "dotenv";
import addQuiz from "../../controllers/quiz/add-quiz.js";
import express from "express"

config();

const router = express.Router();

router.post(process.env.ADD_QUIZ_ROUTE,
    addQuiz
);

export default router;
