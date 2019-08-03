//========================================================================================
/*                                                                                      *
 *                             require the node dependencies                            *
 *                                                                                      */
//========================================================================================

//########################################################################################

/**
 * @classdesc   This class contins the utility functions that we would require
 */
class Utils{

  constructor(){

  }

  /**
   * @description               This method checks wther the request body has the required function
   * 
   * @param {Object} reqObj     The request body 
   * 
   * @param {Array} requiredArr The array which has all the values we want to check for
   * 
   * @returns                   True if it contains every key else false
   */
  async checkReqBody(reqObj,requiredArr){
    var isComplete = true
    await requiredArr.forEach(val=>{
      if(!reqObj.hasOwnProperty(val))
        isComplete = false
    })
    return isComplete
  }

  /**
   * @description               This method will add the notifiction for 
   * 
   * @param {string} productId  The unique id of the thing for which which we would like to add notidication like for post/comment the postid/commentid
   * 
   * @param {number} productId  The unique id of the thing for which which we would like to add notidication like for post/comment the postid/commentid
   * 
   * @param {Object} db         The instance of the Database class for query execution
   * 
   * @param {Object} connection The connection from the connection pool
   * 
   * @param {String} msg        The msg which you want as notification
   * 
   * @param {number} huidS_to   The id of the user to which you want to send notification
   * 
   * @param {number} huidS_from  The id of the user from which the notification is sent
   */
  async addNotification(tableName,id,db,connection,msg,huidS_to,huidS_from){
    let sql = `SELECT * FROM ${tableName} WHERE ${tableName}id=${id}`
    let connection = await db.getConn()
    let response =await db.queryExec(sql,connection)

    // check if response is 1 i.e there is already same data in database
    if(response.length===0)
      return {bool:false,msg:"the row with that id does not exist see if you entered correct data"}
      
    let id = response[0][`${tableName}id`]

    //NOTE  Name the table which has all the notificiation as notification in the database else it wont work
    let sql = `INSERT INTO ()`
    
  }
}

module.exports = Utils