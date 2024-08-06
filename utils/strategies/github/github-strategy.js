import { Strategy } from "passport-github2";
import passport from "passport";
import { config } from "dotenv";
import User from "../../../models/user.js";

config();
const opts = {};

//Github credentials
opts.clientID = process.env.GITHUB_CLIENT_ID;
opts.clientSecret = process.env.GITHUB_CLIENT_SECRET;
opts.callbackURL = process.env.GITHUB_CALLBACK_URL;



export default passport.use(new Strategy(opts,
    async (accessToken, refreshToken, profile, done) => 
        {
            try{
                const createdUser = await User.findOrCreate(
                    { 
                        where : 
                            { 
                                email : profile.email 
                            } 
                    }
                );
                if(!createdUser){
                    console.error("Error in authenticating user using github");
                }

                return done(null, createdUser);

            }catch(error){
                done(error,null)
            }
        }
    )
);