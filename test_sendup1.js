var request = require('request');

var payload = { 
	'cars':{
		'a001bc': { 'carid': 'a001bc', 'stepid':'02.0', 'timestamp': 1002 }
		},
	'time_prev':1498300809397,
	'time':1498300851588,
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