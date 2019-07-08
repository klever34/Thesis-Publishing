/**
 * Faculty.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true,
      unique: true
    },
    students: {
      collection: 'student',
      via: 'faculty'
    },
    departments: {
      collection: 'department',
      via: 'faculty'
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

    toJSON: function(){
      const obj = this.toObject();
      return obj;

    },

  },
  populatetables: {

  },
  validationMessages: {
    name: {
      required: 'Faculty name is required',
      unique: 'Faculty name must be unique',
    }
  },

  beforeValidate: async (values, next) => {
    next();
  },

  beforeCreate(values, next) {
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

