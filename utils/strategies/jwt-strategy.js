import { Strategy ,ExtractJwt} from "passport-jwt";
import { config } from "dotenv";
import User from "../../models/user.js";
import passport from "passport";

config();
let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET;


export default passport.use(new Strategy(opts, async(jwt_payload, next)=> {
    try{

        console.log("JWT AUTHENTICATION STARTING---------");
        console.log("FINDING USER ------------------------");

        const user = await User.findOne(
            { where: { id: jwt_payload.id } }
        );

        if (user) {
        return next(null, user);
        } else {
        return next(null, false);
        }
    }catch(err){
        console.log(err);
    }
}))
