import User from "../../models/user.js";
import bcrypt from "bcrypt"
import login from "./login.js";

const register = async (email,password,userType) => {
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
}

export default register;