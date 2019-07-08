/**
 * StudentController
 *
 * @description :: Server-side logic for managing students
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const uuid = require('uuid');
module.exports = {
    signup: async (req, res) => {
        try {
            const studentData = req.body;
            const emailToken = uuid.v4();
            studentData.emailVerificationHash = emailToken;
            console.log("I am fine")
            console.log(JSON.stringify(studentData))
            const student = await Student.create(studentData);
            console.log("You re not fine")
            console.log(studentData)
            // await Student.update({
            //     id: student.id
            // });
            // EmailService.sendVerificationEmail(studentData.email).catch(error => error)
            const message = "Student created successfully";
            return ResponseService.json(201, res, message, student);
        } catch (err) {
            return ValidationService.jsonResolveError(err, Student, res);
        }
    },

    create: async (req, res) => {
        let data = req.body;
        try {
            if (Array.isArray(data)) {
                data = data.map(item => ({
                    ...item
                }));
            }
            const student = await Student.create(data);

            return ResponseService.json(201, res, 'Student created successfully', student);
        } catch (error) {
            return ValidationService.jsonResolveError(error, Student, res);
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
                    organization: conditions.organization,
                }));
            }
            const updatedStudent = await Student.update(conditions, studentUpdate);
            if (!updatedStudent.length) {
                return ResponseService.json(404, res, 'Student not found');
            }
            return ResponseService.json(201, res, 'Student Updated Successfully', updatedStudent);
        } catch (error) {
            return ValidationService.jsonResolveError(error, Student, res);
        }
    },

    view: async (req, res) => {
        const conditions = {
            isDeleted: false,
            id: req.params.id,
        };
        try {
            const student = await Student.findOne(conditions);
            if (!student) return ResponseService.json(404, res, 'Student not found');
            return ResponseService.json(201, res, 'Student retrieved successfully', student);
        } catch (err) {
            return ResponseService.error(err, res);
        }
    },

    list: async (req, res) => {
        try {
            const conditions = {
                isDeleted: false
            };
            if (req.student) conditions.student = req.student.id;
            const records = await QueryService.find(Student, req, conditions);
            return ResponseService.json(200, res, 'Students retrieved successfully', records.data, records.meta);
        } catch (err) {
            return ValidationService.jsonResolveError(err, Student, res);
        }
    },

    delete: async (req, res) => {
        let studentData = req.body;
        const conditions = {
            id: studentData.id,
            isDeleted: false,
        };
        try {
            if (Array.isArray(studentData)) {
                studentData = studentData.map(item => ({
                    ...item,
                }));
            }
            const deletedStudent = await Student.update(conditions, {
                isDeleted: true
            });
            if (!deletedStudent.length) {
                return ResponseService.json(404, res, 'Student not found');
            }
            return ResponseService.json(201, res, 'Student deleted successfully');
        } catch (error) {
            return ValidationService.jsonResolveError(error, Student, res);
        }
    },
};

