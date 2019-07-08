/**
 * Request.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    type: {
      type: 'string',
      required: true
    },
    fullName: {
      type: 'string',
      required: true,
    },
    LibraryId: {
      type: 'string',
      required: true,
    },
    email: {
      type: 'string',
      required: true
    },
    thesis: {
      model: 'thesis'
    },
    token: {
      type: 'string'
    },
    active: {
      type: 'boolean',
      defaultsTo: true,
    },
    isDeleted: {
      type: 'boolean',
      defaultsTo: false,
    },
    isApproved: {
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
      required: 'name is required',
    },
    email: {
      required: 'email is required',
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

