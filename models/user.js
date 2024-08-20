
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'
import Profile from './profile/profile.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate:{
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
  },
}, {
  timestamps: true,
});

// One to One Relationship with Profile
User.hasOne(Profile,
  {
    onDelete:"CASCADE",
    foreignKey: {
      name:"user_id"
    }
  }
);

Profile.belongsTo(User);



export default User;