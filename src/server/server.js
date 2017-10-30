var express = require('express');
var path = require('path');
var morgan = require('morgan'); // logger
var bodyParser = require('body-parser');
var https = require('https');
var request = require('request');
var app = express();
var router = express.Router();

app.set('port', (process.env.PORT || 4200));

app.use('/', express.static(__dirname + '/../../dist'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan('dev'));

// if(process.env.NODE_ENV.trim() == 'production'){
// 	var ENDPOINT = 'https://campeagle.secure.force.com/authTest/services/apexrest/authTest';
// } else {
	var ENDPOINT = 'https://devbox-campeagle.cs67.force.com/authTest/services/apexrest/authTest';
// }

/* URI -- API */
app.get('/login', function(req, res) {
    console.log(req.query);

    // request.get(`${ENDPOINT}?id=${req.query.email}`, function(error, response, body) {
    //     if(!error && response.statusCode == 200) {
    //         res.send(JSON.parse(body));
    //     } else if(error) {
    //         res.send(JSON.parse(error));
    //     } else {
    //         res.sendStatus(response.statusCode);
    //     }
    // });
});

// all other routes are handled by Angular
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname,'/../../dist/index.html'));
  });
  
  app.listen(app.get('port'), function() {
    console.log('Open Waiver is listening on port '+app.get('port')+' in '+process.env.NODE_ENV);
  });
  
  module.exports = app;