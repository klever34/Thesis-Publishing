/**
 * Authentication Controller
 */
const passport = require('passport');

// let exp = process.env.EXPIRY;
// const expRememberMe = 'expiryRememberMe';

let exp = sails.config.settings.jwt.expiry;
let passwordExpiry = sails.config.settings.passwordReset.expiry;
const expRememberMe = sails.config.settings.jwt.expiryRememberMe;

module.exports = {
    adminLogin(req, res) {
        passport.authenticate('Admin', {
            session: false
        }, (err, admin, info) => {
            const doLogin = async () => {
                if (err) return ResponseService.json(401, res, 'Login unsucessful');
                if (!admin) return {
                    status: 401,
                    message: info.message,
                };
                const payload = {
                    id: admin.id,
                    role: admin.role,
                    roleType: admin.roleType,
                    organization: admin.organization,
                };
                let token = JwtService.issue(payload);
                const remember = _.has(req.body, 'remember') && req.body.remember === true;
                exp = remember ? expRememberMe : exp;
                token = JwtService.issue(payload, exp);
                return {
                    status: 200,
                    message: 'Token created successfully',
                    data: {
                        user: admin,
                        token,
                    },
                };
            };
            return doLogin()
                .then(result => ResponseService.json(result.status, res, result.message, result.data))
                .catch(err => ResponseService.json(401, res, 'Login unsuccessful', err));
        })(req, res);
    },

    studentLogin(req, res) {
        passport.authenticate('local', {
            session: false
        }, (err, student, info) => {
            const doLogin = async () => {
                if (err) return ResponseService.json(401, res, 'Login unsucessful');
                if (!student) return ResponseService.json(401, res, info.message);
                const payload = {
                    id: student.id
                };
                let token = JwtService.issue(payload);
                const remember = _.has(req.body, 'remember') && req.body.remember === true;
                exp = remember ? expRememberMe : exp;
                token = JwtService.issue(payload, exp);
                return {
                    status: 200,
                    message: 'Token created successfully',
                    data: {
                        student,
                        token
                    }
                };
            };
            return doLogin()
                .then(result => ResponseService.json(result.status, res, result.message, result.data))
                .catch(err => ResponseService.json(401, res, 'Login unsuccessful', err));
        })(req, res);
    },

      getDetailsWithToken: (req, res) => {
        if (req.headers && req.headers.authorization) {
            const [scheme, token] = req.headers.authorization.split(' ');
            if (Boolean(scheme) && Boolean(token)) {
              if (/^Bearer$/i.test(scheme)) {
                return JwtService.verify(token, async (err, verifytoken) => {
                  const runResponse = async () => {
                    if (err) return ResponseService.json(401, res, err.message);
                    let admin = null;
                    try {
                      admin = await Admin.findOne({ id: verifytoken.id, isDeleted: false });
                    } catch (err) {
                      admin = undefined;
                    }
                    if (!admin) {
                      return ResponseService.json(404, res, 'User not found');
                    }
                    const refreshedToken = JwtService.issue(admin);

                    return ResponseService.json(
                      200, res, 'Token refreshed successful', {
                        admin,
                        token: refreshedToken,
                        expiry: refreshedToken.exp
                      },
                    );
                  };
                  return runResponse();
                });
              }
              return ResponseService.json(401, res, 'Invalid authorization scheme.');
            }
            return ResponseService.json(401, res, 'Invalid authorization header.');
          }
          return ResponseService.json(401, res, 'No authorization header was found.');
      },
};
