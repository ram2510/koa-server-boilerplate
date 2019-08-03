//========================================================================================
/*                                                                                      *
 *                             require the node dependencies                            *
 *                                                                                      */
//========================================================================================

const Koa = require('koa')

const cors = require('koa-cors')

const convert = require('koa-convert')

const bodyParser = require('koa-body');

//########################################################################################

//========================================================================================
/*                                                                                      *
 *                                set up the dependencies                               *
 *                                                                                      */
//========================================================================================

const app = new Koa()

const {checkReqBody,errorHandling,sqlInjectionProtection} = require('./middleware/middeleware')

//########################################################################################

//========================================================================================
/*                                                                                      *
 *                                 initialise the routes                                *
 *                                                                                      */
//========================================================================================

const routes = require('./routes/index')

//########################################################################################

//========================================================================================
/*                                                                                      *
 *                              configuring the middeleware                             *
 *                                                                                      */
//========================================================================================

app.use(bodyParser({multipart: true}))

app.use(checkReqBody)

app.use(errorHandling)

app.use(sqlInjectionProtection)

app.use(routes())

app.use(convert(cors()))


//########################################################################################

const port = process.env.PORT || 4000

// TODO Add discord client to log messages
app.on('error', (err, ctx) => {
  /* centralized error handling:
   *   console.log error
   *   write error to log file
   *   save error and request information to database if ctx.request match condition
   *   ...
  */
});



module.exports = app.listen(port)