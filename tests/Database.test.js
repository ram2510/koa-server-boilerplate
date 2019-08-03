
//========================================================================================
/*                                                                                      *
 *                         require the node testing dependencies                        *
 *                                                                                      */
//========================================================================================

const Database     = require('../services/Database');

const keys = require('../config/keys')

//########################################################################################



beforeAll(async ()=>{
  db = new Database(keys.host,keys.username,keys.password,keys.database)

  pool = await db.getConn()
})



test('should give a connecton from connection pooling',async (done) => {
  pool.getConnection((err,connection)=>{
    expect(err).toBeFalsy()
    expect(connection).toBeDefined()
    done()
  })
})


test('should execute the query and send response',async (done) => {
  let response = await db.queryExec("SELECT 'Something sweet'",pool)
  expect(response).toEqual([{"Something sweet": "Something sweet"}])
  done()
})


afterAll(()=>{
  pool.end(err=>{
    if(err) throw err
  })
})
