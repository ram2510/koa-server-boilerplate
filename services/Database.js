var mysql = require('mysql');

/**
 * @class   This class handles all the database related stuff
 * 
 * @author  Ram Pandey
 */
class Database{
  
  /**
   * 
   * @param {string} host     the protocol to be used
   * @param {string} user     the username for database
   * @param {string} password the password for accessing database
   * @param {string} database the database name
   */
  constructor(host,user,password,database){
    this.host = host
    this.user = user
    this.password = password
    this.database = database
  }

  /**
   * @method  This method return a connection using which we can perform query execution
   */
  async getConn(){
    var con =await mysql.createPool({
     connectionLimit : 10,
     host:this.host,
     user:this.user,
     password:this.password,
     database:this.database
    })
    return con
  }

  /**
   * @method                    This method executes add query
   * 
   * @param {String} sqlQuery   The query to perform 
   * 
   * @param {Object} conn       The db connection from getConn
   */
  async queryExec(sqlQuery,conn){
    return new Promise((resolve,reject)=>{
      conn.getConnection(function(err, connection) {
        if (err) reject(err); // not connected!
        // Use the connection
        connection.query(sqlQuery, function (error, results, fields) {
          // When done with the connection, release it.
          connection.release()

          // Handle error after the release.
          if (error) reject(error);

          resolve(results)
          // Don't use the connection here, it has been returned to the pool.
        })
      })
    }) 
  }
  
  /**
   * @description           This function checks whether a request contain sql injection or not
   * 
   * @param {String} value  The data to be checked for
   * 
   * @returns               True if it contains sql injection else false
   * 
   * @author  Ram Pandey
   */
  hasSql(value) {

    var sql_meta = new RegExp('(%27)|(\')|(--)|(%23)|(#)', 'i')
    if (sql_meta.test(value)) {
        return true
    }

    var sql_meta2 = new RegExp('((%3D)|(=))[^\n]*((%27)|(\')|(--)|(%3B)|(;))', 'i')
    if (sql_meta2.test(value)) {
        return true
    }

    var sql_typical = new RegExp('w*((%27)|(\'))((%6F)|o|(%4F))((%72)|r|(%52))', 'i')
    if (sql_typical.test(value)) {
        return true
    }

    var sql_union = new RegExp('((%27)|(\'))union', 'i')
    if (sql_union.test(value)) {
        return true
    }

    return false;
}



}

module.exports = Database
