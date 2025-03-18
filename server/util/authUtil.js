const passport = require('passport');
const passportJWT = require('passport-jwt');
const JWT = require('jwt-simple');
const bcrypt = require('bcryptjs');
const User = require('./models/userModel'); 

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET, 
};

const strategy = new JwtStrategy(jwtOptions, async (jwt_payload, next) => {
  try {
    const user = await User.findById(jwt_payload.id);
    if (user) {
      next(null, user);
    } else {
      next(null, false);
    }
  } catch (err) {
    next(err, false);
  }
});

passport.use(strategy);

const generateToken = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role,
  };
  return JWT.encode(payload, jwtOptions.secretOrKey);
};

const authenticate = passport.authenticate('jwt', { session: false });

module.exports = { generateToken, authenticate };
