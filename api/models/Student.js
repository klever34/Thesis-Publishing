/**
 * Student.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

const bcrypt = require('bcrypt');

const hashPassword = (values) => {
  const hash = bcrypt.hashSync(values.password, 8);
  values.password = hash;
  return values;
};

module.exports = {
  attributes: {
    firstName: {
      type: 'string',
      required: true,
    },
    lastName: {
      type: 'string',
      required: true,
    },
    matric: {
      type: 'string',
      required: true,
      unique: true,
    },
    department: {
      model: 'department',      
      required: true,
    },
    faculty: {
      model: 'faculty',
      required: true,
    },
    email: {
      type: 'email',
      required: true,
      email: true,
      unique: true,
    },
    password: {
      type: 'string',
      required: true,
      protected: true,
    },
    thesis: {
      model: 'thesis'
    },
    active: {
      type: 'boolean',
      defaultsTo: true,
    },
    isDeleted: {
      type: 'boolean',
      defaultsTo: false,
    },
    serverCreatedAt: {
      type: 'datetime',
    },
    serverUpdatedAt: {
      type: 'datetime',
    },
    emailVerificationHash: {
      type: 'string',
    },
    emailVerified: {
      type: 'boolean',
      defaultsTo: false,
    },

    verifyPassword(pass, cb) {
      const obj = this.toObject();
      if (cb) return bcrypt.compare(pass, obj.password, cb);
      return bcrypt.compareSync(pass, obj.password);
    },

    toJSON: function(){
      const obj = this.toObject();
      delete obj.password;
      return obj;
    },

    hashPassword(pass) {
      const obj = {
        password: pass,
      };
      if (!_.isNull(pass)) hashPassword(obj);
      return obj.password;
    },
  },
  populatetables: {
    faculty: true,
    department: true,
    thesis: true,
  },
  validationMessages: {
    // mobileNumber: {
    //   required: 'Mobile number is required',
    //   unique: 'Mobile number must be unique',
    // },
    email: {
      required: 'Email is required',
      email: 'Valid email is required',
      unique: 'Email must be unique',
    },
    password: {
      required: 'Password is required',
    },
    matric: {
      required: 'Matric number is required',
      matric: 'Valid email is required',
      unique: 'Matric number must be unique',
    },
  },

  beforeValidate: async (values, next) => {
    next();
  },

  beforeCreate(values, next) {
    if (!_.isNull(values.password) && !_.isEmpty(values.password)){
      hashPassword(values);
    }
    const timeNow = _moment().format();
    values.serverCreatedAt = timeNow;
    values.serverUpdatedAt = timeNow;
    next();
  },
  afterCreate: async (values, next) => {
    next();
  },
  beforeUpdate(values, next) {
    values.serverUpdatedAt = _moment().format();
    next();
  },
};



