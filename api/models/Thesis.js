/**
 * Thesis.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    studentName: {
      type: 'string',
      required: true,
    },
    faculty: {
      model: 'faculty',
      required: true,
    },
    department: {
      model: 'department',      
      required: true,
    },
    projectTitle: {
      type: 'string',      
      required: true,
    },
    year: {
      type: 'string',
      required: true,
    },
    supervisor: {
      type: 'string',      
    },
    supervisorEmail: {
      type: 'string',      
    },
    fileName: {
      type: 'string',
      required: true
    },
    keywords: {
      type: 'json',
      // required: true,
    },
    description: {
      type: 'string'
    },
    mediaUrl: {
      type: 'string',
      required: true
    },
    isApproved: {
      type: 'boolean',
      defaultsTo: false
    },
    isDownloaded: {
      type: 'boolean',
      defaultsTo: false
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
    title: {
      required: 'title is required',
      unique: 'title must be unique',
    },
    description: {
      required: 'description is required',
    },
    keywords: {
      required: 'keywords is required',
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

