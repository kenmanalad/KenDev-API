import express from "express";
import { config } from "dotenv";
import addChapter from "../../controllers/chapter/add-chapter.js";

config();

const router = express.Router();

router.post(process.env.ADD_CHAPTER_ROUTE,
    addChapter
);

export default router;