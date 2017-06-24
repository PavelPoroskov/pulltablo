var request = require('request');

var payload = { 
	'cars':{'d007ee': ''},
    'time_prev':1498300851588,
    'time':1498301007768,
    'source':'tetra'
	};

request.post(
    'http://127.0.0.1:3000/publish-update',
    { json: payload },
    function (error, response, body) {
//        if (!error && response.statusCode == 200) {
        if (!error) {
            console.log(response.statusCode)
        }
    }
);