const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const User = require("../models/userModel");

const jwtSecret = "###dadsjsdd#$";

const strategy = new Strategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret,
  },
  async (jwtPayload, done) => {
    try {
      const user = await User.findById({ userId: jwtPayload });
      if (!user) {
        const error = new Error("User not found");
        console.log(error);
      }
      done(null, user);
    } catch (error) {
      done(error);
    }
  }
);


passport.use(strategy);

const initialize = () => {
    return passport.initialize()
}

const authenticate = () => { 
  return passport.authenticate('jwt', {session: false})
}

module.exports = {initialize, authenticate};
