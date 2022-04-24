const http = require('http')
require('./connections')

const routes = require('./routes')

const requesListener = (req,res) => {
  routes(req,res)
}

module.exports = requesListener


