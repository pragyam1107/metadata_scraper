const express = require('express'),
app = express(),
port = process.env.PORT || 1337;
app.listen(port);
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({limit: '5MB'}));
app.use(cors());

const routes = require(__dirname+'/routes/approute.js'); //importing route
routes(app); //register the route

console.log('API server listening on: ' + port);