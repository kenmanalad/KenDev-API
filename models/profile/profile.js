import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js'


const Profile = sequelize.define('Profile', {
  user_id : {
    type: DataTypes.INTEGER
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  level: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Apprentice III"
  },
  imgUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  userType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nonITCareer: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ITCareer: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  school: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  collegeProgram: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  schoolYear: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  
}, {
  timestamps: true,
});


export default Profile;