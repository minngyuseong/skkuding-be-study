const express = require('express')
const app = express()
const port = 3000
var fs = require('fs')

const bodyParser = require('body-parser')
var compression = require('compression')
const topicRouter = require('./routes/topic')
const indexRouter = require('./routes/index')
const helmet = require('helmet')


app.use(express.static('public'))
app.use(bodyParser.urlencoded())
app.use(compression({ filter: shouldCompress }))
app.use(function(request, response, next){
  fs.readdir('./data', function(error, filelist){
    request.list = filelist;
    next();
  }); 
})
app.use('/', indexRouter)
app.use('/topic', topicRouter)
app.use(helmet())


function shouldCompress (request, response) {
  if (request.headers['x-no-compression']) {
    // don't compress responses with this requestuest header
    return false
  }

  // fallback to standard filter function
  return compression.filter(request, response)
}





// 그동안 모든 middleware가 실행된 후에 마지막에 실행되는 에러처리
app.use((req, res, next) => {
  res.status(404).send('Sorry cant find that!')
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
