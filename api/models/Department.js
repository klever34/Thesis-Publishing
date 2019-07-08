/**
 * Department.js
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
      via: 'department'
    },
    thesis: {
      collection: 'thesis',
      via: 'department'
    },
    faculty: {
      model: 'faculty',
      required: true,
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
      required: 'Department name is required',
      unique: 'Department name must be unique',
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

