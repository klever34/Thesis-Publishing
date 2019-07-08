// const SparkPost = require('sparkpost');
// const uuid = require('uuid');
// var nodemailer = require('nodemailer');
// const client = new SparkPost(process.env.EMAIL_KEY);
// const TinyURL = require('tinyurl');

// module.exports = {
//   sendVerificationEmail: async (email) => {
//     const token = uuid.v4();
//     const url = process.env.BASE_URL;
//     const createurl = `${url}/verify?token=${token}`;
//     try {
//       await client.transmissions.send({
//         options: {
//           sandbox: false,
//         },
//         content: {
//           from: process.env.SENDER_EMAIL,
//           subject: process.env.SENDER_NAME,
//           html: `<html>
//           <body>
//             <h1>Please verify <a href='${createurl}'>your email</a></h1>
//           </body>
//         </html>`,
//         },
//         recipients: [{
//           address: email
//         }, ],
//       });
//       return true;
//     } catch (err) {
//       console.log("email error "+ err);
//       return (err);
//     }
//   },

//   sendEmail: async (email) => {
//     try {
//       await client.transmissions.send({
//         options: {
//           sandbox: false,
//         },
//         content: {
//           from: process.env.SENDER_EMAIL,
//           subject: process.env.SENDER_NAME,
//           html: '<html><body><p>Welcome to Uniben Project Portal</p></body></html>',
//         },
//         recipients: [
//           { address: email },
//         ],
//       });
//       return true;
//     } catch (err) {
//       return (err);
//     }
//   },

//   sendNewAdminEmail: async (email, password) => {
//     const url = process.env.BASE_URL;
//     try {
//       await client.transmissions.send({
//         options: {
//           sandbox: false,
//         },
//         content: {
//           from: process.env.SENDER_NAME,
//           subject: 'New User Login details',
//           html: `<html>
//           <body>
//             <h3>You have just been given access to Uniben Project Portal with this email ${email}.</h3>
//             <h3>Please log in to <a href="${url}/admin/login">Uniben Project Portal</a> with this email and password ${password}.</h3>
//           </body>
//         </html>`,
//         },
//         recipients: [{
//           address: email
//         }, ],
//       });
//       return true;
//     } catch (err) {
//       console.log(err);
//       return (err);
//     }
//   },

// sendDownloadLink: async (email, token, id) => {
//   const url = `https://uniben-project-portal-app.herokuapp.com/request/token/${id}?token=${token}`;
//   var transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 465,
//     secure: true, // use SSL
//     auth: {
//       user: 'unibenproject2019@gmail.com',
//       pass: 'unibenprojectportal'
//     }
//   });
//   TinyURL.shorten(url, async function (newUrl) {
//     tinyUrl = newUrl;
//     var mailOptions = {
//       from: 'unibenproject2019@gmail.com', // sender address (who sends)
//       to: `${email}`, // list of receivers (who receives)
//       subject: 'Granted Access to Download Project', // Subject line
//       text: 'Uniben Project Portal ', // plaintext body
//       html: `<html>
//           <body>
//             <h3>Dear user,</h3>
//             <h3>Kindly follow this link ${newUrl} to download the project.</h3>
//             <h3>Thank you</h3>
//           </body>
//         </html>`,
//     };
//     try {
//       const [error, info] = await transporter.sendMail(mailOptions);
//       if (error) {
//         return console.log(error);
//       }
//       console.log(`Message sent:  ${info.response}`)
//     } catch (err) {
//       console.log(err);
//       return (err);
//     }
//   });
// },

//   sendAdminTestEmail: async (email, password) => {
//     const url = `https://unibenpps.herokuapp.com/`;
//     var transporter = nodemailer.createTransport({
//       host: 'smtp.gmail.com',
//       port: 465,
//       secure: true, // use SSL
//       auth: {
//           user: 'unibenproject2019@gmail.com',
//           pass: 'unibenprojectportal'
//       }
//     });
//     var mailOptions = {
//       from: 'unibenproject2019@gmail.com', // sender address (who sends)
//       to: `${email}`, // list of receivers (who receives)
//       subject: 'Granted Access to Uniben Portal', // Subject line
//       text: 'Uniben Project Portal ', // plaintext body
//       html: `<html>
//       <body>
//         <h3>You have just been given access to Uniben Project Portal with this email ${email}.</h3>
//         <h3>Please log in to <a href="${url}/sign-in">Uniben Project Portal</a> with this email and password ${password}.</h3>
//       </body>
//     </html>`,
//     };
//     try {
//       const [error, info] = await transporter.sendMail(mailOptions);
//       if(error){
//         return console.log(error);
//       }
//       console.log(`Message sent:  ${info.response}`)
//     } catch (err) {
//       console.log(err);
//       return (err);
//     }
//   }

// };

const TinyURL = require('tinyurl');
const SparkPost = require('sparkpost');
const uuid = require('uuid');
var nodemailer = require('nodemailer');
const client = new SparkPost(sails.config.settings.email.key);


module.exports = {
  sendVerificationEmail: async (email) => {
    const token = uuid.v4();
    const url = sails.config.settings.api.baseUrl;

    const createurl = `${url}/verify?token=${token}`;
    try {
      await client.transmissions.send({
        options: {
          sandbox: false,
        },
        content: {
          from: sails.config.settings.email.sender.company,
          subject: sails.config.settings.email.sender.subject,
          html: `<html>
          <body>
            <h1>Please verify <a href='${createurl}'>your email</a></h1>
          </body>
        </html>`,
        },
        recipients: [{
          address: email
        },],
      });
      return true;
    } catch (err) {
      console.log("email error " + err);
      return (err);
    }
  },

  sendEmail: async (email) => {
    try {
      await client.transmissions.send({
        options: {
          sandbox: false,
        },
        content: {
          from: sails.config.settings.email.sender.company,
          subject: sails.config.settings.email.sender.subject,
          html: '<html><body><p>Welcome to Uniben Project Portal</p></body></html>',
        },
        recipients: [
          { address: email },
        ],
      });
      return true;
    } catch (err) {
      return (err);
    }
  },

  sendNewAdminEmail: async (email, password) => {
    const url = sails.config.settings.api.baseUrl;
    try {
      await client.transmissions.send({
        options: {
          sandbox: false,
        },
        content: {
          from: sails.config.settings.email.sender.company,
          subject: 'New User Login details',
          html: `<html>
          <body>
            <h3>You have just been given access to Uniben Project Portal with this email ${email}.</h3>
            <h3>Please log in to <a href="${url}/admin/login">Uniben Project Portal</a> with this email and password ${password}.</h3>
          </body>
        </html>`,
        },
        recipients: [{
          address: email
        },],
      });
      return true;
    } catch (err) {
      console.log(err);
      return (err);
    }
  },

  sendDownloadLink: async (email, token, id) => {
    const url = `https://uniben-project-portal-app.herokuapp.com/request/token/${id}?token=${token}`;
    var transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // use SSL
      auth: {
        user: 'unibenproject2019@gmail.com',
        pass: 'unibenprojectportal'
      }
    });
    TinyURL.shorten(url, async function (newUrl) {
      tinyUrl = newUrl;
      var mailOptions = {
        from: 'unibenproject2019@gmail.com', // sender address (who sends)
        to: `${email}`, // list of receivers (who receives)
        subject: 'Granted Access to Download Project', // Subject line
        text: 'Uniben Project Portal ', // plaintext body
        html: `<html>
            <body>
              <h3>Dear user,</h3>
              <h3>Kindly follow this link ${newUrl} to download the project.</h3>
              <h3>Thank you</h3>
            </body>
          </html>`,
      };
      try {
        const [error, info] = await transporter.sendMail(mailOptions);
        if (error) {
          return console.log(error);
        }
        console.log(`Message sent:  ${info.response}`)
      } catch (err) {
        console.log(err);
        return (err);
      }
    });
  },

  sendAdminTestEmail: async (email, password) => {
    const url = `https://unibenpps.herokuapp.com/`;
    var transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // use SSL
      auth: {
        user: 'unibenproject2019@gmail.com',
        pass: 'unibenprojectportal'
      }
    });
    var mailOptions = {
      from: 'unibenproject2019@gmail.com', // sender address (who sends)
      to: `${email}`, // list of receivers (who receives)
      subject: 'Granted Access to Uniben Portal', // Subject line
      text: 'Uniben Project Portal ', // plaintext body
      html: `<html>
      <body>
        <h3>You have just been given access to Uniben Project Portal with this email ${email}.</h3>
        <h3>Please log in to <a href="${url}/sign-in">Uniben Project Portal</a> with this email and password ${password}.</h3>
      </body>
    </html>`,
    };
    try {
      const [error, info] = await transporter.sendMail(mailOptions);
      if (error) {
        return console.log(error);
      }
      console.log(`Message sent:  ${info.response}`)
    } catch (err) {
      console.log(err);
      return (err);
    }
  }
};
