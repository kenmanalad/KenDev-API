import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';
import Quiz from '../quizzes/quiz.js';

const Chapter = sequelize.define('chapter', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
  },
  body: {
    type: DataTypes.TEXT,
  },
  example: {
    type: DataTypes.TEXT,
  },
  
}, {
  timestamps: true,
});

Chapter.hasOne(Quiz, {
    onDelete: "CASCADE",
    primaryKey: {
        name: "chapter_id"
    }
});

Quiz.belongsTo(Chapter);


export default Chapter;