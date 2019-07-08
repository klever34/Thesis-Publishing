/**
 * isMonitor
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = (req, res, next) => {
    if (req.student) {
      return next();
    }
    return responseHelper.json(401, res, 'You are not permitted to perform this action.');
  };
  