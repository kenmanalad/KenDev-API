import User from "../../models/user.js";
import bcrypt from "bcrypt"
import login from "./login.js";

const register = async (email,password,userType) => {
    try{
        const hashedPassword = await bcrypt.hash(password,10);
        console.log(hashedPassword);
        User.create(
            {
                email, 
                password: hashedPassword
            }
         );
    }catch(err){

    }
}

export default register;