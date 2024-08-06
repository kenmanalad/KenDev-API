import User from "../../models/user.js";
import bcrypt from "bcrypt"
import login from "./login.js";

const register = async (email,password,userType,oauth) => {

    try{
        if(oauth){

            const created = await User.findOrCreate(
                {
                    where:{email: email}
                }
            );

            if(!created){
                throw new Error(`Problem occured while creating user for oauth`);
            }

            return created[0].dataValues.id
        } else {
            const hashedPassword = await bcrypt.hash(password,10);
            
            // console.log(hashedPassword);

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