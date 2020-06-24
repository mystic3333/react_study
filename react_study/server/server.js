const express = require('express')
const router = require('./router/router')

const app = express()
app.use('/', router)

app.listen(3100, function () {
    console.log('listening in port 3100')
})