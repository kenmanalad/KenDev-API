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
  imgUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  
}, {
  timestamps: true,
});


export default Profile;