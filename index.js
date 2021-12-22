
const app = require('./api/src/app.js')
const express = require("express");
const path = require('path');

const app1 = express()
 
app1.use(express.static(__dirname));

app1.get('/', function (req, res) {

  res.sendFile(__dirname + '/index.html')

})
  
app1.listen(3000)