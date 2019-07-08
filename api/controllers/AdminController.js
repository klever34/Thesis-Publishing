/**
 * AdminController
 *
 * @description :: Server-side logic for managing admins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    create: async (req, res) => {
        let data = req.body;
        try {
            if (Array.isArray(data)) {
                data = data.map(item => ({
                    ...item,
                }));
            }
            const admin = await Admin.create(data);
            return ResponseService.json(201, res, 'Admin created successfully', admin);
        } catch (error) {
            return ResponseService.error(error, res);
        }
    },

    createNewAdmin: async (req, res) => {
        let generator = require('generate-password');
        const password = generator.generate({
            length: 10,
            numbers: true,
            excludeSimilarCharacters: true
        });
        console.log(`generated pwd => ${password}`)
        req.body.password = password;
        let data = req.body;
        try {
            if (Array.isArray(data)) {
                data = data.map(item => ({
                    ...item,
                }));
            }
            const admin = await Admin.create(data);
            await EmailService.sendAdminTestEmail(req.body.email, password);
            return ResponseService.json(201, res, 'Admin created successfully', admin);
        } catch (error) {
            return ResponseService.error(error, res);
        }
    },

    update: async (req, res) => {
        let adminUpdate = req.body;
        const conditions = {
            id: req.params.id,
            isDeleted: false,
        };
        try {
            if (Array.isArray(adminUpdate)) {
                adminUpdate = adminUpdate.map(item => ({
                    ...item,
                }));
            }
            const updatedAdmin = await Admin.update(conditions, adminUpdate);
            if (!updatedAdmin.length) {
                return ResponseService.json(404, res, 'Admin not found');
            }
            return ResponseService.json(201, res, 'Admin Updated Successfully', updatedAdmin);
        } catch (error) {
            return ValidationService.jsonResolveError(error, Admin, res);
        }
    },

    view: async (req, res) => {
        const conditions = {
            isDeleted: false,
            id: req.params.id,
        };
        try {
            const admin = await Admin.findOne(conditions);
            if (!admin) return ResponseService.json(404, res, 'Admin not found');
            return ResponseService.json(201, res, 'Admin retrieved successfully', admin);
        } catch (err) {
            return ValidationService.jsonResolveError(err, Admin, res);
        }
    },

    list: async (req, res) => {
        try {
            const conditions = { isDeleted: false };
            const records = await QueryService.find(Admin, req, conditions);
            return ResponseService.json(200, res, 'Admins retrieved successfully', records.data, records.meta);
        } catch (err) {
            return ValidationService.jsonResolveError(err, Admin, res);
        }
    },

    delete: async (req, res) => {
        let adminData = req.body;
        const conditions = {
            id: adminData.id,
            isDeleted: false,
        };
        try {
            if (Array.isArray(adminData)) {
                adminData = adminData.map(item => ({
                    ...item,
                }));
            }
            const deletedAdmin = await Admin.update(conditions, { isDeleted: true });
            if (!deletedAdmin.length) {
                return ResponseService.json(404, res, 'Admin not found');
            }
            return ResponseService.json(201, res, 'Admin deleted successfully');
        } catch (error) {
            return ResponseService.error(error, res);
        }
    },
    
    updateAdminPassword: (req, res) => {
        let adminUpdate = req.body;
        const conditions = {
            id: req.params.id,
            isDeleted: false,
        };
        if (req.headers && req.headers.authorization) {
            const [scheme, token] = req.headers.authorization.split(' ');
            if (Boolean(scheme) && Boolean(token)) {
              if (/^Bearer$/i.test(scheme)) {
                return JwtService.verify(token, async (err, verifytoken) => {
                  const runResponse = async () => {
                    if (err) return ResponseService.json(401, res, err.message);
                    let admin = null;
                    try {
                      admin = await Admin.findOne({ id: verifytoken.id, isDeleted: false });
                      if (admin.verifyPassword(req.body.old_password)) {
                        const updateAdmin = await Admin.update(conditions, adminUpdate);
                        return ResponseService.json(201, res, 'Admin Updated Successfully', updateAdmin);
                      }
                      else {
                        return done(null, false, {
                            status: 401,
                            message: 'Invalid Password.',
                        });
                      }
                    } catch (err) {
                      admin = undefined;
                    }
                    if (!admin) {
                      return ResponseService.json(404, res, 'User not found');
                    }
                  };
                  return runResponse();
                });
              }
              return ResponseService.json(401, res, 'Invalid authorization scheme.');
            }
            return ResponseService.json(401, res, 'Invalid authorization header.');
          }
          return ResponseService.json(401, res, 'No authorization header was found.');
      },
};

