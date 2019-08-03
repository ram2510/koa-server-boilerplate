//========================================================================================
/*                                                                                      *
 *                               reqire node dependencies                               *
 *                                                                                      */
//========================================================================================

const combineRouters = require('koa-combine-routers')

//########################################################################################

//========================================================================================
/*                                                                                      *
 *                              require all the routes here                             *
 *                                                                                      */
//========================================================================================

const productRoute = require('./product/index')

const fetchRoute = require('./fetch/index')

//########################################################################################

/**
 * SECTION 
 * 1) adding all the allowed methods and routes for every
 * router is tedious so i used this wrapper here
 */
const router = combineRouters(
  productRoute,
  fetchRoute
)

module.exports = router