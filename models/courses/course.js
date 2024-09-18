import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';
import Chapter from '../chapters/chapter.js';

const Course = sequelize.define('course', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  coursePic: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.TEXT,
  },
  level: {
    type: DataTypes.STRING,
  },
  tech_stack: {
    type: DataTypes.STRING,
  },
}, {
  timestamps: true,
});

Course.hasMany(Chapter,{
    onDelete:"CASCADE",
    foreignKey: {
        name:"course_id"
    }
});

Chapter.belongsTo(Course);

export default Course;