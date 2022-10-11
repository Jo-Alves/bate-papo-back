const passport = require("passport-jwt");
const JwtStrategy = passport.Strategy,
    ExtractJwt = passport.ExtractJwt;
const User = require("../app/models/user-model");

const opt = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET
};

module.exports = passport => {
    passport.use(new JwtStrategy(opt, async(payload, done) => {
        User._email = payload.email
        const user = await User.findByEmail();

        if (user.error) {
            return done({error: "erro.."}, null);            
        }
        const data = user.emailExits ? payload : false;
        return done(null, data);
    }))
}