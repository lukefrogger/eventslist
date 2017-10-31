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

const PASS = 'adventure3';
const USERNAME = 'luke@campeagle.org.devbox';

// if(process.env.NODE_ENV.trim() == 'production'){
// 	var ENDPOINT = 'https://campeagle.secure.force.com/authTest/services/apexrest/authTest';
// } else {
	var ENDPOINT = 'https://devbox-campeagle.cs67.force.com/authTest/services/apexrest/authTest';
// }

/* URI -- API */
app.post('/login', function (req, res) {
    var headers = {"Content-Type": "application/x-www-form-urlencoded"};
    var form = {
      grant_type: 'password',
      client_id: '3MVG99E3Ry5mh4zqNsp6HovAR3hPPB176Hzuc8wcTLed_3YNXIxSkSkLZ7UqmJA8DpMbmDwAzfsaQlNWsDkB4',
      client_secret: '1217469309399725886',
      username: USERNAME,
      password: PASS
    };

    request.post('https://cs67.salesforce.com/services/oauth2/token', {headers: headers, form: form},
      function (error, response) {
        if (!error && response.statusCode === 200) {
            res.send(response);
        } else if (error) {
            res.send(JSON.parse(error));
        } else {
            res.sendStatus(JSON.parse(response.statusCode));
        }
      }
    );
});

// all other routes are handled by Angular
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname,'/../../dist/index.html'));
  });
  
  app.listen(app.get('port'), function() {
    console.log('Open Waiver is listening on port '+app.get('port')+' in '+process.env.NODE_ENV);
  });
  
  module.exports = app;