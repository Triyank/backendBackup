const passport=require("passport");
const googleStrategy=require("passport-google-oauth20").Strategy;
require("dotenv").config();
const {clientID,clientSecret,callbackURL}=process.env;

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
passport.deserializeUser(function(user, done) {
    done(null, user);
});
passport.use(new googleStrategy({
    clientID,
    clientSecret,
    callbackURL,
},
    (accessToken,refreshToken,profile,done)=>done(null,profile)
));