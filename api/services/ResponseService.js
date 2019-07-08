/**
 * ResponseService.js
 */
module.exports = {
    json(status, res, message, data, meta) {
      const response = {
        response: {
          message,
        },
      };
      if (typeof data !== 'undefined') {
        response.response.data = data;
      }
      if (typeof meta !== 'undefined') {
        response.response.meta = meta;
      }
      return res.status(status).json(response);
    },
    error(err, res) {
      const response = {
        message: 'Validation error has occured',
      };
      if (err.Errors) {
        response.errors = err.Errors;
        return res.status(400).json(response);
      }
  
      if (err.invalidAttributes) {
        response.errors = err.invalidAttributes;
        return res.status(400).json(response);
      }
      const e = JSON.parse(JSON.stringify(err));
      if (e.raw) {
        if (e.raw.length && !_.isUndefined(e.raw[0].err)) {
          response.errors = e.raw[0].err.Errors;
        } else {
          response.errors = e.raw;
        }
        return res.status(400).json(response);
      }
  
      return res.negotiate(err);
    },
    customError(res, data) {
      const response = {
        message: 'Validation error has occured',
      };
      response.errors = {};
      _.forEach(data, (value, key) => {
        response.errors[value.field] = [];
        _.forEach(value.rules, (rule, key) => {
          response.errors[value.field].push({
            rule: rule[0],
            message: rule[1],
          });
        });
      });
      return res.status(400).json(response);
    },
  };
  