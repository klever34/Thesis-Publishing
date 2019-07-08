/**
 * FacultyController
 *
 * @description :: Server-side logic for managing faculties
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
            const faculty = await Faculty.create(data);

            return ResponseService.json(201, res, 'Faculty created successfully', faculty);
        } catch (error) {
            return ResponseService.error(error, res);
        }
    },

    update: async (req, res) => {
        let facultyUpdate = req.body;
        const conditions = {
            id: req.params.id,
            isDeleted: false,
        };
        try {
            if (Array.isArray(facultyUpdate)) {
                facultyUpdate = facultyUpdate.map(item => ({
                    ...item,
                }));
            }
            const updatedFaculty = await Faculty.update(conditions, facultyUpdate);
            if (!updatedFaculty.length) {
                return ResponseService.json(404, res, 'Faculty not found');
            }
            return ResponseService.json(201, res, 'Faculty Updated Successfully', updatedFaculty);
        } catch (error) {
            return ValidationService.jsonResolveError(error, Faculty, res);
        }
    },

    view: async (req, res) => {
        const conditions = {
            isDeleted: false,
            id: req.params.id,
        };
        try {
            const faculty = await Faculty.findOne(conditions);
            if (!faculty) return ResponseService.json(404, res, 'Faculty not found');
            return ResponseService.json(201, res, 'Faculty retrieved successfully', faculty);
        } catch (err) {
            return ValidationService.jsonResolveError(err, Faculty, res);
        }
    },

    list: async (req, res) => {
        try {
            const conditions = { isDeleted: false };
            const records = await QueryService.find(Faculty, req, conditions);
            return ResponseService.json(200, res, 'Faculties retrieved successfully', records.data, records.meta);
        } catch (err) {
            return ValidationService.jsonResolveError(err, Faculty, res);
        }
    },

    delete: async (req, res) => {
        let facultyUpdated = req.body;
        const conditions = {
            id: facultyUpdated.id,
            isDeleted: false,
        };
        try {
            if (Array.isArray(facultyUpdated)) {
                facultyUpdated = facultyUpdated.map(item => ({
                    ...item,
                }));
            }
            const deletedFaculty = await Faculty.update(conditions, { isDeleted: true });
            if (!deletedFaculty.length) {
                return ResponseService.json(404, res, 'Faculty not found');
            }
            return ResponseService.json(201, res, 'Faculty deleted successfully');
        } catch (error) {
            return ResponseService.error(error, res);
        }
    },
};

