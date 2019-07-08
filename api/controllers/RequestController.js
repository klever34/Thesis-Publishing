/**
 * RequestController
 *
 * @description :: Server-side logic for managing requests
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
            const request = await Request.create(data);

            return ResponseService.json(201, res, 'Request created successfully', request);
        } catch (error) {
            return ResponseService.error(error, res);
        }
    },

    update: async (req, res) => {
        let requestUpdate = req.body;
        const conditions = {
            id: req.params.id,
            isDeleted: false,
        };
        try {
            if (Array.isArray(requestUpdate)) {
                requestUpdate = requestUpdate.map(item => ({
                    ...item,
                }));
            }
            const updatedRequest = await Request.update(conditions, requestUpdate);
            if (!updatedRequest.length) {
                return ResponseService.json(404, res, 'Request not found');
            }
            return ResponseService.json(201, res, 'Request Updated Successfully', updatedRequest);
        } catch (error) {
            return ValidationService.jsonResolveError(error, Request, res);
        }
    },

    downloadLink: async (req, res) => {
        const conditions = {
            id: req.params.id,
            isDeleted: false,
        };
        try {
            const getRequest = await Request.findOne(conditions).populate('thesis');
            const payload = {
                id: getRequest.id,
                thesis_id: getRequest.thesis.id,
                thesis: getRequest.thesis.mediaUrl
            }
            let token = JwtService.issue(payload);
            await EmailService.sendDownloadLink(getRequest.email, token, getRequest.id);
            await Request.update(conditions, { isApproved: true });
            return ResponseService.json(201, res, 'Download Link Successfully Sent');
        } catch (error) {
            return ValidationService.jsonResolveError(error, Request, res);
        }
    },

    tokenLink: async (req, res) => {
        try {
            return JwtService.verify(req.query.token, async (err, verifytoken) => {
                const runResponse = async () => {
                if (err) return ResponseService.json(401, res, err.message);
                await Thesis.update({ id: verifytoken.thesis_id }, { isDownloaded: true })
                return res.redirect(verifytoken.thesis);
                };
                return runResponse();
            });
        } catch (error) {

        }
    },

    view: async (req, res) => {
        const conditions = {
            isDeleted: false,
            id: req.params.id,
        };
        try {
            const request = await Request.findOne(conditions).populate('thesis');
            if (!request) return ResponseService.json(404, res, 'Request not found');
            return ResponseService.json(201, res, 'Request retrieved successfully', request);
        } catch (err) {
            return ValidationService.jsonResolveError(err, Request, res);
        }
    },

    list: async (req, res) => {
        try {
            const conditions = { isDeleted: false };
            const records = await Request.find(conditions).populate('thesis');
            if (req.query.total === "count") {
                return ResponseService.json(200, res, 'Requests count', records.length, records.meta);
            }
            else {
                return ResponseService.json(200, res, 'Requests retrieved successfully', records, records.meta);
            }
        } catch (err) {
            return ValidationService.jsonResolveError(err, Request, res);
        }
    },

    delete: async (req, res) => {
        let requestUpdated = req.body;
        const conditions = {
            id: requestUpdated.id,
            isDeleted: false,
        };
        try {
            if (Array.isArray(requestUpdated)) {
                requestUpdated = requestUpdated.map(item => ({
                    ...item,
                }));
            }
            const deletedRequest = await Request.update(conditions, { isDeleted: true });
            if (!deletedRequest.length) {
                return ResponseService.json(404, res, 'Request not found');
            }
            return ResponseService.json(201, res, 'Request deleted successfully');
        } catch (error) {
            return ResponseService.error(error, res);
        }
    },
};

