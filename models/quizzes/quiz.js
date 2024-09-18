import sequelize from "../../config/database.js";
import { DataTypes } from "sequelize";

const Quiz = sequelize.define("quiz",{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    question: {
        type: DataTypes.STRING
    }
},{
    timestamps: true,
});

export default Quiz;