import User from "../../models/user.js";
import bcrypt from "bcrypt"
import login from "./login.js";

const register = async (email,password,userType,oauth) => {

    try{
        if(oauth){

            const existingUser = await User.findOne(
                {
                    where: {email}
                }
            );

            if(existingUser){
                console.error("Email Address is already in used");
                return false;
            }

            const created = await User.create(
                {
                    email, 
                    password: null
                }
             );
            if(!created){
                console.error("There is an issue in using your social network account");
                return false;
            }

            return created.id
            
        } else {
            const hashedPassword = await bcrypt.hash(password,10);
            

            const created = await User.create(
                {
                    email, 
                    password: hashedPassword
                }
             );

            if(!created){
                return false;
            }

            return true;

        }
    }catch(err){
        console.error(err);
        throw new Error("User creation failed");
    }

}

export default register;