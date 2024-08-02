import User from "../../models/user.js";
import bcrypt from "bcrypt"
import login from "./login.js";

const register = async (email,password,userType,authType) => {
    if(!authType){
        try{
            const hashedPassword = await bcrypt.hash(password,10);
            console.log(hashedPassword);
            const created = await User.create(
                {
                    email, 
                    password: hashedPassword
                }
             );
            if(created){
                return true;
            }
            else{
                return false;
            }
        }catch(err){
            console.error(err);
            throw new Error("User creation failed");
        }
    }else{
        try{
            const existingUser = await User.findOne({ where: {email}});

            if(existingUser){
                return existingUser.id;
            }
            
            const created = await User.create(
                {
                    email, 
                    password: null
                }
             );
            if(created){
                return created.id;
            }
            else{
                return false;
            }
        }catch(err){
            console.error(err);
            throw new Error("User creation failed");
        }
    }
}

export default register;