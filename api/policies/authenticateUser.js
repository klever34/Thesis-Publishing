/**
 * Allow any authenticated user.
 */

module.exports = (req, res, next) => {
    if (req.headers && req.headers.authorization) {
      const [scheme, token] = req.headers.authorization.split(' ');
      if (Boolean(scheme) && Boolean(token)) {
        if (/^Bearer$/i.test(scheme)) {
          return JwtService.verify(token, async (err, verifytoken) => {
            const runResponse = async () => {
              if (err) return responseHelper.json(401, res, err.message);
  
              try {
                req.user = await Admin.findOne({ id: verifytoken.id, isDeleted: false });
                if (req.user === undefined) {
                  req.user = await User.findOne({ id: verifytoken.id, isDeleted: false });
                }
              } catch (error) {
                req.user = undefined;
              }
  
              if (!req.user) {
                return responseHelper.json(404, res, 'User not found');
              }
              next();
              return true;
            };
            return runResponse();
          });
        }
        return responseHelper.json(401, res, 'Invalid authorization scheme.');
      }
      return responseHelper.json(401, res, 'Invalid authorization header.');
    }
    return responseHelper.json(401, res, 'No authorization header was found.');
  };
  