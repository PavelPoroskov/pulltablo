var request = require('request');

var payload = { 
	'cars':{'d007ee': ''},
	'time_fullstate':'2017-06-06T07:20:57.470Z',
	'time_update_prev':'2017-06-06T07:21:02.855Z',
	'time_update':'2017-06-06T07:21:10.687Z'
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