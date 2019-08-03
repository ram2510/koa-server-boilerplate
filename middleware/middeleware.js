

//========================================================================================
/*                                                                                      *
 *                             require the node dependencies                            *
 *                                                                                      */
//========================================================================================

const Database = require('../services/Database')

//########################################################################################

let db = new Database()

/**
 * SECTION  I want to check whether the req object is empty or not
 *      so i decided to use a middelware
 */

module.exports = {

  /**
   * @description   This checks for every request whether its empty
   * 
   * @returns       an error response stating bad request
   * 
   * @author   Ram Pandey
   */
  checkReqBody:async (ctx, next) => {
    if(Object.entries(ctx.request.body).length === 0){
     ctx.throw(400,JSON.stringify({error:"Bad request"}))
    }
    return next()
  },


  /**
   * @description       The middleware used for error handling
   */
  errorHandling:async (ctx,next)=>{
    try {
      return await next()
    } catch (err) {
      ctx.status = err.status || 500;
      ctx.body = err.message;
      ctx.app.emit('error', err, ctx);    }
  },

  sqlInjectionProtection:async (ctx,next)=>{
    await Object.keys(ctx.request.body).forEach(key=>{
      let sqlInjection = db.hasSql(ctx.request.body[key])
      if(sqlInjection)
        ctx.throw(403,JSON.stringify({error:"Sql injection"}))
    })
    return next()
  }
}