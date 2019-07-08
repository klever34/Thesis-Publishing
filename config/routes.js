/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    view: 'homepage'
  },
   /*
   * AuthController routes
   */
  'POST /admin/login': {
    controller: 'AuthController',
    action: 'adminLogin',
  },
  'POST /student/login': {
    controller: 'AuthController',
    action: 'studentLogin',
  },
  'GET /admin/details': {
    controller: 'AuthController',
    action: 'getDetailsWithToken',
  },


  /*
   * AdminController routes 
   */
  'POST /admin': {
    controller: 'AdminController',
    action: 'create',
  },
  'POST /admin/createadmin': {
    controller: 'AdminController',
    action: 'createNewAdmin',
  },
  'GET /admin/:id': {
    controller: 'AdminController',
    action: 'view',
  },
  'GET /admin': {
    controller: 'AdminController',
    action: 'list',
  },
  'PUT /admin/:id': {
    controller: 'AdminController',
    action: 'update',
  },
  'PUT /admin/update-password/:id': {
    controller: 'AdminController',
    action: 'updateAdminPassword',
  },
  'DELETE /admin': {
    controller: 'AdminController',
    action: 'delete',
  },


  /*
   * DepartmentController routes
   */
  'POST /department': {
    controller: 'DepartmentController',
    action: 'create',
  },
  'GET /department/:id': {
    controller: 'DepartmentController',
    action: 'view',
  },
  'GET /department': {
    controller: 'DepartmentController',
    action: 'list',
  },
  'PUT /department/:id': {
    controller: 'DepartmentController',
    action: 'update',
  },
  'DELETE /department': {
    controller: 'DepartmentController',
    action: 'delete',
  },


  /*
   * FacultyController routes
   */
  'POST /faculty': {
    controller: 'FacultyController',
    action: 'create',
  },
  'GET /faculty/:id': {
    controller: 'FacultyController',
    action: 'view',
  },
  'GET /faculty': {
    controller: 'FacultyController',
    action: 'list',
  },
  'PUT /faculty/:id': {
    controller: 'FacultyController',
    action: 'update',
  },
  'DELETE /faculty/:id': {
    controller: 'FacultyController',
    action: 'delete',
  },

  /*
   * RequestController routes
   */
  'POST /request': {
    controller: 'RequestController',
    action: 'create',
  },
  'GET /request/:id': {
    controller: 'RequestController',
    action: 'view',
  },
  'POST /request/sendlink/:id': {
    controller: 'RequestController',
    action: 'downloadLink',
  },
  'GET /request/token/:id': {
    controller: 'RequestController',
    action: 'tokenLink',
  },
  'GET /request': {
    controller: 'RequestController',
    action: 'list',
  },
  'PUT /request/:id': {
    controller: 'RequestController',
    action: 'update',
  },
  'DELETE /request/:id': {
    controller: 'RequestController',
    action: 'delete',
  },

  /*
   * StudentController routes
   */
  'POST /student/signup': {
    controller: 'StudentController',
    action: 'signup',
  },
   'POST /student': {
    controller: 'StudentController',
    action: 'create',
  },
  'GET /student/:id': {
    controller: 'StudentController',
    action: 'view',
  },
  'GET /student': {
    controller: 'StudentController',
    action: 'list',
  },
  'PUT /student/:id': {
    controller: 'StudentController',
    action: 'update',
  },
  'DELETE /student/:id': {
    controller: 'StudentController',
    action: 'delete',
  },

  /*
   * ThesisController routes
   */
  'POST /thesis': {
    controller: 'ThesisController',
    action: 'create',
  },
  'POST /thesis/wordUpload': {
    controller: 'ThesisController',
    action: 'wordConversion',
  },
  'GET /thesis/getfile': {
    controller: 'ThesisController',
    action: 'getFile',
  },
  'GET /thesis/:id': {
    controller: 'ThesisController',
    action: 'view',
  },
  'GET /thesis/getfile/:id': {
    controller: 'ThesisController',
    action: 'downloadFile',
  },
  'GET /thesis': {
    controller: 'ThesisController',
    action: 'list',
  },
  'PUT /thesis/:id': {
    controller: 'ThesisController',
    action: 'update',
  },
  'DELETE /thesis/:id': {
    controller: 'ThesisController',
    action: 'delete',
  },

  /*
   * UniversityController routes
   */
  'POST /university': {
    controller: 'UniversityController',
    action: 'create',
  },
  'GET /university/:id': {
    controller: 'UniversityController',
    action: 'view',
  },
  'GET /university': {
    controller: 'UniversityController',
    action: 'list',
  },
  'PUT /university/:id': {
    controller: 'UniversityController',
    action: 'update',
  },
  'DELETE /university': {
    controller: 'UniversityController',
    action: 'delete',
  },
};

