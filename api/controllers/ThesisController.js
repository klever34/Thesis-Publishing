/**
 * ThesisController
 *
 * @description :: Server-side logic for managing theses
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const fs = require('fs');
const base64 = require('base64topdf');
const path = require('path');
const axios = require('axios');
var convertapi = require("convertapi")("eKN4wR0XXuXFBwgD");
var newUrl = '';

module.exports = {
    create: async (req, res) => {
        let data = req.body;
        let mediaLinkUrl = '';
        let reqFileName = req.body.fileName.replace(/\s/g, '');
        base64.base64Decode(`${req.body.mediaUrl}`, `${reqFileName}.pdf`);
        fs.copyFile(`${reqFileName}.pdf`, `assets/images/${reqFileName}.pdf`, async (err) => {
            if (err) throw err;
            fs.unlink(`${reqFileName}.pdf`, async function (err) {
                if (err) throw err;
            });
            //just remove convertapi from here and bring out the Google storage part from under it
            await convertapi
            .convert(
              "watermark",
              {
                File: `assets/images/${reqFileName}.pdf`,
                Text: 'Uniben PPS Uniben PPS Uniben PPS Uniben PPS',
                FontSize: '90',
                VerticalAlignment: 'center',
                Rotate: '110'
              },
              "pdf"
            )
            .then(function(result) {
              console.log("Conversion cost: " + result.conversionCost);
              fs.unlink(`assets/images/${reqFileName}.pdf`, async function(err) {
                  if (err) throw err;
                  await result.saveFiles(`assets/images/converted/${reqFileName}.pdf`);
                  try {
                    if (Array.isArray(data)) {
                        data = data.map(item => ({
                            ...item,
                        }));
                    }
                    const {
                        Storage
                      } = require('@google-cloud/storage');
                
                      const storage = new Storage({
                        keyFilename: 'gcs-key.json'
                      });
                
                      const bucketName = 'uniben-portal-staging';
                      const filename = `assets/images/converted/${reqFileName}.pdf`;
                      const file = `${reqFileName}.pdf`
                
                      try {
                        const result = await storage
                          .bucket(bucketName)
                          .upload(filename, {
                            gzip: true,
                            metadata: {
                              cacheControl: 'public, max-age=31536000',
                            },
                          })
                      } catch (error) {
                        console.error('ERROR:', error);
                      }
                
                      try {
                        await storage
                          .bucket(bucketName)
                          .file(file)
                          .makePublic()
                      } catch (error) {
                        console.error('ERROR:', error);
                      }
                      try {
                        const urlresponse = await axios.get(`https://www.googleapis.com/storage/v1/b/uniben-portal-staging/o/${reqFileName}.pdf`);
                        mediaLinkUrl = urlresponse.data.mediaLink;
                      } catch (err) {
                        console.log(err);
                      }
                    data.mediaUrl = mediaLinkUrl;
                    // data.mediaUrl = `https://storage.googleapis.com/uniben-portal-staging/${reqFileName}.pdf`;
                    const thesis = await Thesis.create(data);
                    await Student.update({ id: req.body.student }, { thesis: thesis.id });
                    return ResponseService.json(201, res, {
                        message: 'Project uploaded successfully!',
                    }, thesis)
    
                } catch (error) {
                    return ResponseService.error(error, res);
                }


                });
            });

        });

    },
    wordConversion: async (req, res) => {
        let data = req.body;
        let reqFileName = req.body.fileName.replace(/\s/g, "");
        let mediaLinkUrl = '';
        base64.base64Decode(`${req.body.mediaUrl}`, `${reqFileName}.docx`);
        const err = await fs.copyFile(`${reqFileName}.docx`,`assets/images/${reqFileName}.docx`,
          async err => {
            if (err) throw err;
            fs.unlink(`${reqFileName}.docx`, async function(err) {
              if (err) throw err;
            });
            await convertapi
              .convert("pdf", { File: `assets/images/${reqFileName}.docx` })
              .then(function(result) {
                // get converted file url
                console.log("Converted file url: " + result.file.url);
                // save to file
                console.log("Conversion cost: " + result.conversionCost);
                fs.unlink(`assets/images/${reqFileName}.docx`, async function(err) {
                    if (err) throw err;
                  });
                return result.file.save(`assets/images/${reqFileName}.pdf`);
              })
              .then(function(file) {
                console.log("File saved: " + file);
              });
    
            const result = await convertapi
              .convert(
                "watermark",
                {
                  File: `assets/images/${reqFileName}.pdf`,
                  Text: 'Uniben PPS Uniben PPS Uniben PPS Uniben PPS',
                  FontSize: '90',
                  VerticalAlignment: 'center',
                  Rotate: '110'
                },
                "pdf"
              )
              .then(function(result) {
                console.log("Conversion cost: " + result.conversionCost);
                console.log("Conversion file: " + result.file.url);
                fs.unlink(`assets/images/${reqFileName}.pdf`, async function(err) {
                    if (err) throw err;
                    await result.saveFiles(`assets/images/converted/${reqFileName}.pdf`);
                    try {
                        if (Array.isArray(data)) {
                            data = data.map(item => ({
                                ...item,
                            }));
                        }
        
                        const {
                            Storage
                          } = require('@google-cloud/storage');
                    
                          const storage = new Storage({
                            keyFilename: 'gcs-key.json'
                          });
                    
                          const bucketName = 'uniben-portal-staging';
                          const filename = `assets/images/converted/${reqFileName}.pdf`;
                          const file = `${reqFileName}.pdf`
                    
                          try {
                            const result = await storage
                              .bucket(bucketName)
                              .upload(filename, {
                                gzip: true,
                                metadata: {
                                  cacheControl: 'public, max-age=31536000',
                                },
                              })
                          } catch (error) {
                            console.error('ERROR:', error);
                          }
                    
                          try {
                            await storage
                              .bucket(bucketName)
                              .file(file)
                              .makePublic()
                          } catch (error) {
                            console.error('ERROR:', error);
                          }
                          try {
                            const urlresponse = await axios.get(`https://www.googleapis.com/storage/v1/b/uniben-portal-staging/o/${reqFileName}.pdf`);
                            mediaLinkUrl = urlresponse.data.mediaLink;
                          } catch (err) {
                            console.log(err);
                          }
                        data.mediaUrl = mediaLinkUrl;
            
                        // req.body.mediaUrl = `https://uniben-project-portal-app.herokuapp.com/images/${reqFileName}.pdf`;
                        const thesis = await Thesis.create(data);
                        await Student.update({ id: req.body.student }, { thesis: thesis.id });
                        return ResponseService.json(201, res, {
                            message: 'Project uploaded successfully!',
                        }, thesis)
            
                    } catch (error) {
                        return ResponseService.error(error, res);
                    }
                  });
              });
          }
        );
      },
    
    getFile: async (req, res) => {
        const fileUrl = req.query.name;
        const fileId = req.query.id;
        const filepath = path.resolve(`assets/images/${fileUrl}`)
        const stat = fs.statSync(filepath)
        const fileSize = stat.size
        const range = req.headers.range

        if (range) {
            const parts = range.replace(/bytes=/, "").split("-")
            const start = parseInt(parts[0], 10)
            const end = parts[1]
                ? parseInt(parts[1], 10)
                : fileSize - 1

            const chunksize = (end - start) + 1
            const file = fs.createReadStream(filepath, { start, end })
            const head = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': 'application/pdf',
            }

            res.writeHead(206, head)
            file.pipe(res)
        } else {
            res.setHeader(
                "Content-disposition",
                "attachment; filename=" + `${fileUrl}`
            );
            let fileStream = fs.createReadStream(filepath);
            fileStream.pipe(res);
            await Thesis.update({ id: fileId }, { isDownloaded: true })

        }
    },

    update: async (req, res) => {
        let thesisUpdate = req.body;
        const conditions = {
            id: req.params.id,
            isDeleted: false,
        };
        try {
            if (Array.isArray(thesisUpdate)) {
                thesisUpdate = thesisUpdate.map(item => ({
                    ...item,
                }));
            }
            const updatedThesis = await Thesis.update(conditions, thesisUpdate);
            if (!updatedThesis.length) {
                return ResponseService.json(404, res, 'Thesis not found');
            }
            return ResponseService.json(201, res, 'Thesis Updated Successfully', updatedThesis);
        } catch (error) {
            return ValidationService.jsonResolveError(error, Thesis, res);
        }
    },

    view: async (req, res) => {
        const conditions = {
            isDeleted: false,
            id: req.params.id,
        };
        try {
            const thesis = await Thesis.findOne(conditions).populate('department').populate('faculty');
            if (!thesis) return ResponseService.json(404, res, 'Thesis not found');
            return ResponseService.json(201, res, 'Thesis retrieved successfully', thesis);
        } catch (err) {
            return ValidationService.jsonResolveError(err, Thesis, res);
        }
    },

    list: async (req, res) => {
        const title = (req.query.search).toLowerCase();
        const conditions = { isDeleted: false };
        try {
            const records = await Thesis.find(conditions).populate('department').populate('faculty');
            if (title !== undefined) {
                const queriedResults = records.filter(function (proj) {
                    if (proj.projectTitle.toLowerCase().includes(title)) {
                        return proj.projectTitle.toLowerCase().includes(title);
                    }
                    else if (proj.studentName.toLowerCase().includes(title)) {
                        return proj.studentName.toLowerCase().includes(title);
                    }
                    else if (proj.supervisor.toLowerCase().includes(title)) {
                        return proj.supervisor.toLowerCase().includes(title);
                    }
                });
                return ResponseService.json(200, res, 'Thesis retrieved successfully', queriedResults);
            }
            if (req.query.total === "count") {
                return ResponseService.json(200, res, 'Thesis count', records.length);
            }
            if (req.query.total === "downloads") {
                const queryConditions = { isDeleted: false, isDownloaded: true };
                const getRecords = await QueryService.find(Thesis, req, queryConditions);
                return ResponseService.json(200, res, 'Thesis count', getRecords.data.length);
            }
            else {
                return ResponseService.json(200, res, 'Thesis retrieved successfully', records, records.meta);
            }
        } catch (err) {
            return ValidationService.jsonResolveError(err, Thesis, res);
        }
    },

    downloadFile: async (req, res) => {
        const conditions = {
            id: req.params.id,
            isDeleted: false,
        };
        try {
            const getThesis = await Thesis.findOne(conditions);
            await Thesis.update({ id: getThesis.id }, { isDownloaded: true })
            return res.redirect(getThesis.mediaUrl);
        } catch (error) {
            return ValidationService.jsonResolveError(error, Request, res);
        }
    },

    delete: async (req, res) => {
        let thesisUpdated = req.body;
        const conditions = {
            id: thesisUpdated.id,
            isDeleted: false,
        };
        try {
            if (Array.isArray(thesisUpdated)) {
                thesisUpdated = thesisUpdated.map(item => ({
                    ...item,
                }));
            }
            const deletedThesis = await Thesis.update(conditions, { isDeleted: true });
            if (!deletedThesis.length) {
                return ResponseService.json(404, res, 'Thesis not found');
            }
            return ResponseService.json(201, res, 'Thesis deleted successfully');
        } catch (error) {
            return ResponseService.error(error, res);
        }
    }
};

