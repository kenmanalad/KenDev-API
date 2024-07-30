import passport from "passport";
import Strategy from "passport-local";
import User from "../../models/user.js";
import login from "../../controllers/auth/login.js"


passport.serializeUser((user,next)=>{

    console.log("Serializing User --------------->");
    next(null,user.id);
    
});
passport.deserializeUser(async (id, next) => {
    try{
        console.log("Deserializing User --------------->");
        const findUser = await User.findByPk(id);
        if(!findUser) throw new Error("User Not Found");
        next(null, findUser);
    }catch(err){
        next(err,null);
    }

})
export default passport.use(new Strategy(async (username,password,next) => {
    try{

        console.log("Using Local Strategy --------------->");
        console.log("Finding User --------------->");
        console.log("Processing Credentials --------------->");


        const {success, user, errorMessage} = await login(username,password);
        if(!success){
            next(errorMessage,null);
        }
        next(null,user);


    }catch(err){
        next(err,null);
    }
}));