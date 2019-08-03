//========================================================================================
/*                                                                                      *
 *                             require the node dependencies                            *
 *                                                                                      */
//========================================================================================

const Router = require('koa-router')

//########################################################################################

//========================================================================================
/*                                                                                      *
 *                                 require the services                                 *
 *                                                                                      */
//========================================================================================

const Database = require('../../services/Database')

const Files = require('../../services/Files')

const Utils = require('../../services/Utils')

//########################################################################################

//========================================================================================
/*                                                                                      *
 *                                   require the keys                                   *
 *                                                                                      */
//========================================================================================

const keys = require('../../config/keys')

//########################################################################################

// initialise all the services

let db = new Database(keys.host,keys.username,keys.password,keys.database)

let product = new Router({ prefix: '/product' })

let utils = new Utils()

/**
 * @route       POST api/product/add
 * 
 * @description Add data to database
 * 
 * @author      Ram Pandey
 */
product.post('/add',async ctx=>{

  let isReqObjComplete =await utils.checkReqBody(ctx.request.body,["huidS","description","college","year","department","section","price"])
  
  // check whether the request body consists of the required keys
  if (!isReqObjComplete)
    ctx.throw(406)
    product
  let {huidS,description,college,year,department,section,price} = ctx.request.body

  try {
    let sql = `SELECT EXISTS(SELECT 1 FROM product WHERE huidS=${huidS} AND description="${description}" LIMIT 1)`
    let connection = await db.getConn()
    let response =await db.queryExec(sql,connection)

    // check if response is 1 i.e there is already same data in database
    if(response[0][Object.keys(response[0])[0]]===1)
      ctx.throw(403)
    
    // we upload the file here
    let file = new Files(ctx.request.files,huidS,"upload","dropproduct")
    file = JSON.stringify(file)

    // here we will add it to database
    sql = `INSERT INTO product (huidS,description,college,year,department,section,price,image) VALUES (${huidS},"${description}","${college}","${year}","${department}","${section}",${price},'${file}')`
    response = await db.queryExec(sql,connection)

    // send success response
    ctx.body = JSON.stringify({msg:"product added",respoID:response.insertId});ctx.status=200

  } catch (error) {
    // throw errors here
    switch (error.status) {
      case 403:
        ctx.throw(403,JSON.stringify({msg:"Item already present"}))
        break;
      case 406:
        ctx.throw(406,JSON.stringify({msg:"Insuffiecent Information"}))
        break;
      default:
        ctx.throw(500,JSON.stringify({msg:"Internal Server Error",err:error}))    
        break;
    }
  }
})



/**
 * @route       POST api/product/fetch
 * 
 * @description fetch data from database
 * 
 * @author      Ram Pandey
 */
product.post('/fetch',async ctx=>{

  let isReqObjComplete =await utils.checkReqBody(ctx.request.body,["huidS","productid"])
  
  // check whether the request body consists of the required keys
  if (!isReqObjComplete)
    ctx.throw(406)

  let {huidS,productid} = ctx.request.body

  try {
    let sql = `SELECT * FROM product WHERE huidS=${huidS} AND productid=${productid}`
    let connection = await db.getConn()
    let response =await db.queryExec(sql,connection)

    // send success repsonse
    ctx.body = JSON.stringify(response);ctx.status=200

  } catch (error) {
    // throw errors
    switch (error.status) {
      case 406:
        ctx.throw(406,JSON.stringify({msg:"Insuffiecent Information"}))
        break;
      default:
        ctx.throw(500,JSON.stringify({msg:"Internal Server Error",err:error}))    
        break;
    }
  }
})

/**
 * @route       POST api/product/update
 * 
 * @description update data in the database
 * 
 * @author      Ram Pandey
 */
product.post('/update',async ctx=>{

  let isReqObjComplete =await utils.checkReqBody(ctx.request.body,["huidS","productid","description"])
  
  // check whether the request body consists of the required keys
  if (!isReqObjComplete)
    ctx.throw(406)

  let {huidS,productid,description} = ctx.request.body

  try {
    let sql = `SELECT EXISTS(SELECT 1 FROM product WHERE huidS=${huidS} AND productid=${productid} LIMIT 1)`
    let connection = await db.getConn()
    let response =await db.queryExec(sql,connection)

    // check if response is 1 i.e there is already same data
    if(response[0][Object.keys(response[0])[0]]===1)
      {
        sql = `UPDATE product SET description="${description}" WHERE huids=${huidS} AND productid=${productid}`
        let response =await db.queryExec(sql,connection)
        ctx.body = JSON.stringify({msg:"product updated"});ctx.status=200
      }else{
        ctx.throw(400)
      }
  } catch (error) {
    switch (error.status) {
      case 406:
        ctx.throw(406,JSON.stringify({msg:"Insuffiecent Information"}))
        break;
      case 400:
        ctx.throw(400,JSON.stringify({msg:"The product does not exist"}))
        break;  
      default:
        ctx.throw(500,JSON.stringify({msg:"Internal Server Error",err:error}))    
        break;
    }
  }
})

/**
 * @route       POST api/product/delete
 * 
 * @description delete data in the database
 * 
 * @author      Ram Pandey
 */
product.post('/delete',async ctx=>{

  let isReqObjComplete =await utils.checkReqBody(ctx.request.body,["huidS","productid"])
  
  // check whether the request body consists of the required keys
  if (!isReqObjComplete)
    ctx.throw(406)

  let {huidS,productid} = ctx.request.body

  try {
    let sql = `SELECT EXISTS(SELECT 1 FROM product WHERE huidS=${huidS} AND productid=${productid} LIMIT 1)`
    let connection = await db.getConn()
    let response =await db.queryExec(sql,connection)

    // check if response is 1 i.e there is already same data
    if(response[0][Object.keys(response[0])[0]]===1)
      {
        sql = `DELETE FROM product WHERE huids=${huidS} AND productid=${productid}`
        let response =await db.queryExec(sql,connection)
        ctx.body = JSON.stringify({msg:"product deleted"});ctx.status=200
      }else{
        ctx.throw(400)
      }
  } catch (error) {
    switch (error.status) {
      case 406:
        ctx.throw(406,JSON.stringify({msg:"Insuffiecent Information"}))
        break;
      case 400:
        ctx.throw(400,JSON.stringify({msg:"The product does not exist"}))
        break;  
      default:
        ctx.throw(500,JSON.stringify({msg:"Internal Server Error",err:error}))    
        break;
    }
  }
})



module.exports = product