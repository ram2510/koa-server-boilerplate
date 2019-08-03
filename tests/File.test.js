
//========================================================================================
/*                                                                                      *
 *                         require the node testing dependencies                        *
 *                                                                                      */
//========================================================================================

const Files    = require('../services/Files');

const { dirname,join } = require('path')

//########################################################################################


test('should move the file to the upload directory and then delete it', () => {
  let dir = join(__dirname,'test.txt')
  file = new Files({file1:{
    name:'test.txt',
    path:dir
  }},1,"testUpload","dropproducttest")
  expect(file).toBeDefined()
  file.removeFile(join(dirname(__dirname),'testUpload',`${file[0]}`))
})


