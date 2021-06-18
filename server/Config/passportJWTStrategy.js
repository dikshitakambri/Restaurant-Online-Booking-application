const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;

const {ExtractJwt} = require("passport-jwt");
const User = require("../Models/users");
const JWT_SECRET = 'secret';

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : JWT_SECRET
}

passport.use(new JWTStrategy(
    options,
    async (jwtpayload, done) => {
        try{
            const user = await User.findByPk(jwtpayload.id);

            if(user) {
                return done(null, user);
            }else {
                return done(null, false);
            }
        }catch (err) {
            console.log("Error finding user");
            return done(null, false);
        }
    }
));

module.exports = passport;