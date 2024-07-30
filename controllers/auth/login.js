import User from "../../models/user.js"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import { config } from "dotenv"

config();
const login = async (email, password) => {
    try{
        const findUser = await User.findOne({ where : {email} } );
        const isMatch = await bcrypt.compare(password,findUser.password);
        
        let payload = {id: findUser.id}

        let token = jwt.sign(
            payload,
            process.env.SECRET,
            {
                expiresIn:'1d'
            }
        );

        if(!findUser){ 
            return {
                success : false,
                message : "Invalid Email Address",
            }
        }
        else if(!isMatch){     
            return {
                success : false,
                message : "Invalid Password",
            }
        }
        return {
            success:true,
            message: "ok",
            token: token
        };
        

    }catch(error){
        
    }
}
export default login;