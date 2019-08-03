
//========================================================================================
/*                                                                                      *
 *                         require the node testing dependencies                        *
 *                                                                                      */
//========================================================================================
const request = require('supertest')

const app     = require('../index');


//########################################################################################

//========================================================================================
/*                                                                                      *
 *                                   require the keys                                   *
 *                                                                                      */
//========================================================================================

const {join}  = require('path')

//########################################################################################


let userObj = { huidS: '1',
  description: 'test',
  college: 'test',
  year: 'FE',
  department: 'CMPN',
  section: 'A',
  price: '20' 
}


test('should give 400 as no data sent',async (done) => {
  let response = await request(app).post('/product/add')
  .accept('application/json')
  expect(response.status).toBe(400)
  done()
})


test('should give 406 as error due to less information',async (done) => {
  let response = await request(app).post('/product/add')
  .accept('application/json')
  .field('name', 'My name')
  expect(response.status).toBe(406)
  done()
})

//NOTE  remeber to manually delete the file in the upload directory
test('should give status 200 as item is added',async (done) => {
  let response = await request(app).post('/product/add')
  .accept('application/json')
  .field("huidS", userObj.huidS)
  .field("description",userObj.description)
  .field("college",userObj.college)
  .field("year",userObj.year)
  .field("department",userObj.department)
  .field("section",userObj.section)
  .field("price",userObj.price)
  .attach('pic',join(__dirname,'test.txt'))
  expect(response.status).toEqual(200)
  id = JSON.parse(response.text).respoID
  done()
})

test('should update the data and send 200 as response',async (done) => {
  let response = await request(app).post('/product/update')
  .accept('application/json')
  .field("huidS", userObj.huidS)
  .field("productid",id)
  .field("description","test1")
  expect(response.status).toEqual(200)
  done()
})


test('should give a response for fetch api',async (done) => {
  let response = await request(app).post('/product/fetch')
  .accept('application/json')
  .field("huidS", userObj.huidS)
  .field("productid",id)
  expect(response.status).toEqual(200)
  done()
})

test('should give a status of 200 for delete api',async (done) => {
  let response = await request(app).post('/product/delete')
  .field("huidS", userObj.huidS)
  .field("productid",id)
  expect(response.status).toEqual(200)
  done()
})


afterAll(async (done)=>{
  app.close()
  done()
})