/**
 * Connections
 * (sails.config.connections)
 *
 * `Connections` are like "saved settings" for your adapters.  What's the difference between
 * a connection and an adapter, you might ask?  An adapter (e.g. `sails-mysql`) is generic--
 * it needs some additional information to work (e.g. your database host, password, user, etc.)
 * A `connection` is that additional information.
 *
 * Each model must have a `connection` property (a string) which is references the name of one
 * of these connections.  If it doesn't, the default `connection` configured in `config/models.js`
 * will be applied.  Of course, a connection can (and usually is) shared by multiple models.
 * .
 * Note: If you're using version control, you should put your passwords/api keys
 * in `config/local.js`, environment variables, or use another strategy.
 * (this is to prevent you inadvertently sensitive credentials up to your repository.)
 *
 * For more information on configuration, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.connections.html
 */

module.exports.connections = {

  /***************************************************************************
  *                                                                          *
  * Local disk storage for DEVELOPMENT ONLY                                  *
  *                                                                          *
  * Installed by default.                                                    *
  *                                                                          *
  ***************************************************************************/
  // localDiskDb: {
  //   adapter: 'sails-disk'
  // },

  /***************************************************************************
  *                                                                          *
  * MySQL is the world's most popular relational database.                   *
  * http://en.wikipedia.org/wiki/MySQL                                       *
  *                                                                          *
  * Run: npm install sails-mysql@for-sails-0.12 --save                       *
  *                                                                          *
  ***************************************************************************/
  // someMysqlServer: {
  //   adapter: 'sails-mysql',
  //   host: 'YOUR_MYSQL_SERVER_HOSTNAME_OR_IP_ADDRESS',
  //   user: 'YOUR_MYSQL_USER', //optional
  //   password: 'YOUR_MYSQL_PASSWORD', //optional
  //   database: 'YOUR_MYSQL_DB' //optional
  // },

  /***************************************************************************
  *                                                                          *
  * MongoDB is the leading NoSQL database.                                   *
  * http://en.wikipedia.org/wiki/MongoDB                                     *
  *                                                                          *
  * Run: npm install sails-mongo@for-sails-0.12 --save                       *
  *                                                                          *
  ***************************************************************************/
  // someMongodbServer: {
  //   adapter: 'sails-mongo',
  //   host: 'localhost',
  //   port: 27017,
  //   user: 'username', //optional
  //   password: 'password', //optional
  //   database: 'your_mongo_db_name_here' //optional
  // },

  /***************************************************************************
  *                                                                          *
  * PostgreSQL is another officially supported relational database.          *
  * http://en.wikipedia.org/wiki/PostgreSQL                                  *
  *                                                                          *
  * Run: npm install sails-postgresql@for-sails-0.12 --save                  *
  *                                                                          *
  *                                                                          *
  ***************************************************************************/
  somePostgresqlServer: {
    adapter: 'sails-postgresql',
    host: 'ec2-34-239-192-212.compute-1.amazonaws.com',
    user: 'ucls8cktgkp5od', // optional
    password: 'p2400906f9e8e40e07fb149194cebee7f70f92168afe30fc9bea251c7f3057381', // optional
    database: 'd34a8lq7t57u8t', //optional
    // url: 'postgres://ucls8cktgkp5od:p2400906f9e8e40e07fb149194cebee7f70f92168afe30fc9bea251c7f3057381@ec2-34-239-192-212.compute-1.amazonaws.com:5432/d34a8lq7t57u8t',
    default: true,
    ssl: true
  }


  /***************************************************************************
  *                                                                          *
  * More adapters: https://github.com/balderdashy/sails                      *
  *                                                                          *
  ***************************************************************************/

};
