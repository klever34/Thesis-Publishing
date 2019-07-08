module.exports = {
    findOne: async (model, req) => {
      try {
        let query = await model.findOne({ id: req.params.id, isDeleted: false });
        if (req.query.populate) {
          if (_.isArray(req.query.populate)) {
            _(req.query.populate).forEach((populate) => {
              if (populate in model.populatetables) query = query.populate(populate, { isDeleted: false });
            });
          } else if (req.query.populate in model.populatetables) { query = query.populate(req.query.populate, { isDeleted: false }); }
        }
        return Object.assign({}, query);
      } catch (error) {
        throw new Error('Cannot find model');
      }
    },

    find: async (model, req, conditions) => {
      const populateData = [];
      let sortBy = 'createdAt';
      let sortDir = 'DESC';
      if (req.query.populate) {
        if (_.isArray(req.query.populate)) {
          (req.query.populate).forEach((modelName, key) => {
            if (modelName in model.populatetables) {
              populateData.push({
                name: modelName,
                query: {
                  isDeleted: false,
                },
              });
            }
          });
        } else if (req.query.populate in model.populatetables) {
          populateData.push({
            name: req.query.populate,
            query: {
              isDeleted: false,
            },
          });
        }
      }
      if (req.query.sortBy) {
        sortBy = req.query.sortBy;
      }
      if (req.query.sortDir) {
        sortDir = req.query.sortDir;
      }
      const sort = `${sortBy} ${sortDir.toUpperCase()}`;
      const perPage = req.query.perPage;
      const currentPage = req.query.page;
      const records = await _pager.paginate(model, conditions, currentPage, perPage, populateData, sort);
      return records;
    },
  
  };
  