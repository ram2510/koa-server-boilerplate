//========================================================================================
/*                                                                                      *
 *                             require the node dependencies                            *
 *                                                                                      */
//========================================================================================

const crypto                            = require('crypto')

const { unlinkSync,copyFileSync }       = require('fs')

const { dirname,join,extname,basename } =  require('path')

//########################################################################################

/**
 * @class   This class handles all files relate stuff
 * 
 * @author  Ram Pandey
 */
class Files{

  /**
   * @constructor
   * 
   * @param {String} file  The directory for file
   * 
   * @param {number} id              The id of the user
   * 
   * @param {String} uploadDir       The directory (try to keep in the root) where you want to store files 
   * 
   * @param {String} prefixForFile   The prefix with which the file will be saved
   * 
   * @returns                        File array if id is supplied with files added to uploadDir or the file will be removed if file dir is specified and not the id after it 
   * 
   * @author  Ram Pandey
   */

  constructor(file,id,uploadDir,prefixForFile){
    this.file = file
    this.id = id
    this.uploadDir = uploadDir
    this.prefixForFile = prefixForFile
    //NOTE 
    // I call the add file for every instance you can remove this if you dont
    // want it for every instance
    if(this.id!==undefined)
      return this.addFile(this.id,this.uploadDir,this.prefixForFile)
    else
      return this.removeFile(this.file)
  }

  /**
   * @description                    This method is used to add file to a directory
   *  
   * @param {number} id              The id of the user
   * 
   * @param {String} uploadDir       The directory (keep it in the root dir) where you want to store files 
   * 
   * @param {String} prefixForFile   The prefix with which the file will be saved
   * 
   * @returns                         The name of the file
   * 
   * @author Ram Pandey 
   */
  addFile(id,uploadDir,prefixForFile){

    let returnArr = []

    Object.keys(this.file).forEach(file=>{

      let randomString = this.genRandomString(6)

      let ext = extname(this.file[file].name)

      let dir = join(dirname(__dirname),uploadDir,`${prefixForFile}-${id}-${randomString}${ext}`)

      copyFileSync(this.file[file].path,dir)

      returnArr.push(basename(dir))
    })    
    returnArr.removeFile = this.removeFile
    return returnArr
  }

  /**
   * @description            this gives us the random genrated string
   * 
   * @param {number} length  the length of the random generated string we want
   * 
   * @returns                Random string
   * 
   * @author                 Ram Pandey
   */
  genRandomString(length){
    return crypto.randomBytes(Math.ceil(length/2))
            .toString('hex') /** convert to hexadecimal format */
            .slice(0,length)  /** return required number of characters */  
  }


  /**
   * @description             this method deletes the file 
   * 
   * @param {String} fileName the file directory to be deleted
   * 
   * @author  Ram Pandey
   */
  removeFile(fileName){
    unlinkSync(fileName)
  }

}

module.exports = Files
