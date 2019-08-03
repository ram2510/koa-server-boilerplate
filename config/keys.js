if(process.env.NODE_ENV==='prod'){
  module.exports = require('./prod')
}else if(process.env.NODE_ENV==="ci"){
  module.exports = require('./test')
}else{
  module.exports = require('./dev')
}