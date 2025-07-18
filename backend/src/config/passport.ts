import {Strategy as GoogleStrategy}  from 'passport-google-oauth20'
import passport  from 'passport'
import dotenv from 'dotenv'
dotenv.config()

passport.use(
    new GoogleStrategy(
        {
            clientID:process.env.CLIENT_ID!,
            clientSecret:process.env.CLIENT_SECRET!,
            callbackURL:`${process.env.SERVER_URL}/api/auth/google/callback`,
        
        },
        function (accessToken, refreshToken, profile, callback){
            callback(null, profile)
        }
    )
)

export default passport