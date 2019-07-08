const jwt = require('jsonwebtoken');
const uuidv4 = require('uuid/v4');

// const tokenBuffer = Buffer.from(process.env.SECRET).toString('base64');
// const tokenExpiry = process.env.EXPIRY;
// const audience = process.env.DOMAIN;
// const issuer = process.env.HOST;

const tokenBuffer = Buffer.from(sails.config.settings.jwt.secret).toString('base64');
const tokenExpiry = sails.config.settings.jwt.expiry;
const audience = sails.config.settings.jwt.domain;
const issuer = sails.config.settings.jwt.host;
module.exports = {
  issue(payload, expirytime, subject) {
    const token = jwt.sign(payload, tokenBuffer, {
      expiresIn: expirytime || tokenExpiry,
      audience,
      issuer,
      jwtid: uuidv4(),
      subject: subject || 'jwt-auth-token',
    });
    return token;
  },

  verify(token, cb) {
    cb = cb || function () {};
    jwt.verify(token, tokenBuffer, { audience, issuer }, (err, decoded) => cb(err, decoded));
  },
};

