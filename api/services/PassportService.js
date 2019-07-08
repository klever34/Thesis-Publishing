const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
  session: false,
}, (async (req, email, password, done) => {
    const student = await Student.findOne({ email });

    if (!student) {
      return done(null, false, {
        status: 401,
        message: 'Your email account not found.',
      });
    }
    if (student.isDeleted) {
      return done(null, false, {
        status: 401,
        message: 'Email account is not found.',
      });
    }
    if (!student.verifyPassword(password)) {
      return done(null, false, {
        status: 401,
        message: 'Invalid password.',
      });
    }
    return done(null, student);
  })));

  passport.use('Admin', new LocalStrategy({
    usernameField: 'email',
    session: false,
  }, (async (email, password, done) => {
      const admin = await Admin.findOne({ email });
      if (!admin) {
        return done(null, false, {
          status: 401,
          message: 'Wrong email or password.',
        });
      }
      if (admin.isDeleted) {
        return done(null, false, {
          status: 401,
          message: 'Wrong email or password.',
        });
      }
      if (!admin.verifyPassword(password)) {
        return done(null, false, {
          status: 401,
          message: 'Wrong email or password.',
        });
      }
      return done(null, admin);
    })));