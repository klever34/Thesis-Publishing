/**
 * UniversityController
 *
 * @description :: Server-side logic for managing universities
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
            const student = await University.create(data);

            return ResponseService.json(201, res, 'University created successfully', student);
        } catch (error) {
            return ResponseService.error(error, res);
        }
    },

    update: async (req, res) => {
        let studentUpdate = req.body;
        const conditions = {
            id: req.params.id,
            isDeleted: false,
        };
        try {
            if (Array.isArray(studentUpdate)) {
                studentUpdate = studentUpdate.map(item => ({
                    ...item,
                }));
            }
            const updatedUniversity = await University.update(conditions, studentUpdate);
            if (!updatedUniversity.length) {
                return ResponseService.json(404, res, 'University not found');
            }
            return ResponseService.json(201, res, 'University Updated Successfully', updatedUniversity);
        } catch (error) {
            return ValidationService.jsonResolveError(error, University, res);
        }
    },

    view: async (req, res) => {
        const conditions = {
            isDeleted: false,
            id: req.params.id,
        };
        try {
            const student = await University.findOne(conditions);
            if (!student) return ResponseService.json(404, res, 'University not found');
            return ResponseService.json(201, res, 'University retrieved successfully', student);
        } catch (err) {
            return ValidationService.jsonResolveError(err, University, res);
        }
    },

    list: async (req, res) => {
        try {
            const conditions = { isDeleted: false };
            const records = await QueryService.find(University, req, conditions);
            return ResponseService.json(200, res, 'Universities retrieved successfully', records.data, records.meta);
        } catch (err) {
            return ValidationService.jsonResolveError(err, University, res);
        }
    },

    delete: async (req, res) => {
        let studentUpdated = req.body;
        const conditions = {
            id: studentUpdated.id,
            isDeleted: false,
        };
        try {
            if (Array.isArray(studentUpdated)) {
                studentUpdated = studentUpdated.map(item => ({
                    ...item,
                }));
            }
            const deletedUniversity = await University.update(conditions, { isDeleted: true });
            if (!deletedUniversity.length) {
                return ResponseService.json(404, res, 'University not found');
            }
            return ResponseService.json(201, res, 'University deleted successfully');
        } catch (error) {
            return ResponseService.error(error, res);
        }
    },
};

