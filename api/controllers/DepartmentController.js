/**
 * DepartmentController
 *
 * @description :: Server-side logic for managing departments
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
            const dept = await Department.create(data);

            return ResponseService.json(201, res, 'Department created successfully', dept);
        } catch (error) {
            return ResponseService.error(error, res);
        }
    },

    update: async (req, res) => {
        let deptUpdate = req.body;
        const conditions = {
            id: req.params.id,
            isDeleted: false,
        };
        try {
            if (Array.isArray(deptUpdate)) {
                deptUpdate = deptUpdate.map(item => ({
                    ...item,
                }));
            }
            const updatedDept = await Department.update(conditions, deptUpdate);
            if (!updatedDept.length) {
                return ResponseService.json(404, res, 'Department not found');
            }
            return ResponseService.json(201, res, 'Department Updated Successfully', updatedDept);
        } catch (error) {
            return ValidationService.jsonResolveError(error, Department, res);
        }
    },

    view: async (req, res) => {
        const conditions = {
            isDeleted: false,
            id: req.params.id,
        };
        try {
            const dept = await Department.findOne(conditions);
            if (!dept) return ResponseService.json(404, res, 'Department not found');
            return ResponseService.json(201, res, 'Department retrieved successfully', dept);
        } catch (err) {
            return ValidationService.jsonResolveError(err, Department, res);
        }
    },

    list: async (req, res) => {
        try {
            const conditions = { isDeleted: false };
            const records = await QueryService.find(Department, req, conditions);
            return ResponseService.json(200, res, 'Departments retrieved successfully', records.data, records.meta);
        } catch (err) {
            return ValidationService.jsonResolveError(err, Department, res);
        }
    },

    delete: async (req, res) => {
        let deptData = req.body;
        const conditions = {
            id: deptData.id,
            isDeleted: false,
        };
        try {
            if (Array.isArray(deptData)) {
                deptData = deptData.map(item => ({
                    ...item,
                }));
            }
            const deletedDepartment = await Department.update(conditions, { isDeleted: true });
            if (!deletedDepartment.length) {
                return ResponseService.json(404, res, 'Department not found');
            }
            return ResponseService.json(201, res, 'Department deleted successfully');
        } catch (error) {
            return ResponseService.error(error, res);
        }
    },
};

