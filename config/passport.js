const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const User = require("../models/User");
const GoogleStrategy = require('passport-google-oauth20').Strategy;


module.exports = function (passport) {

  // passport.use(new GoogleStrategy({
  //   clientID: GOOGLE_CLIENT_ID,
  //   clientSecret: GOOGLE_CLIENT_SECRET,
  //   callbackURL: "http://localhost:4000/auth/google/callback"
  // },
//   function(accessToken, refreshToken, profile, done) {
//     // handle user data and authentication
//   }
// ));
  
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      User.findOne({ email: email.toLowerCase() }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { msg: `Email ${email} not found.` });
        }
        if (!user.password) {
          return done(null, false, {
            msg:
              "Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.",
          });
        }
        user.comparePassword(password, (err, isMatch) => {
          if (err) {
            return done(err);
          }
          if (isMatch) {
            return done(null, user);
          }
          return done(null, false, { msg: "Invalid email or password." });
        });
      });


  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });
}))


passport.serializeUser(function(user, done) {
	// placeholder for custom user serialization
	// null is for errors
	done(null, user);
});

passport.deserializeUser(function(user, done) {
	// placeholder for custom user deserialization.
	// maybe you are getoing to get the user from mongo by id?
	// null is for errors
	done(null, user);
});


}




