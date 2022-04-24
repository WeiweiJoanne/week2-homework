const headers = require('../services/headers')
const http = {
  cors(req,res){
    res.writeHead(200,headers)
    res.end() 
  },
  notFound(req, res) {
    res.writeHead(404, headers)
    res.end() 
  }
}

module.exports = http
