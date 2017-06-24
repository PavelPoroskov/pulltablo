var request = require('request');

var payload = { 
	'steps':[
		{'stepid': '00.1','name':'Ожидание автомобиля','classCSS':'HeadCell_00_1'}, 
		{'stepid': '01.1','name':'Приемка','classCSS':'HeadCell_01_1'}, 
		{'stepid': '02.0','name':'Мойка (ожидание)','classCSS':'HeadCell_02_0'}, 
		{'stepid': '02.1','name':'Мойка','classCSS':'HeadCell_02_1'}, 
		{'stepid': '04.0','name':'Прямая приемка (ожидание)','classCSS':'HeadCell_04_0'}, 
		{'stepid': '04.1','name':'Прямая приемка','classCSS':'HeadCell_04_1'}, 
		{'stepid': '05.0','name':'Выполнение работ (ожидание)','classCSS':'HeadCell_05_0'}, 
		{'stepid': '05.1','name':'Выполнение работ','classCSS':'HeadCell_05_1'}, 
		{'stepid': '06.0','name':'Контроль качества (ожидание)','classCSS':'HeadCell_06_0'}, 
		{'stepid': '06.1','name':'Контроль качества','classCSS':'HeadCell_06_1'}, 
		{'stepid': '07.1','name':'Подготовка документов','classCSS':'HeadCell_07_1'}, 
		{'stepid': '08.0','name':'Выдача (ожидание)','classCSS':'HeadCell_08_0'}, 
		{'stepid': '08.1','name':'Выдача','classCSS':'HeadCell_08_1'}
		],
	'cars':{
		'a001bc': { 'carid': 'a001bc', 'stepid':'01.1', 'timestamp': 1002 }, 
		'd007em': { 'carid': 'd007em', 'stepid':'01.1', 'timestamp': 1000 }, 
		'd007ee': { 'carid': 'd007ee', 'stepid':'02.1', 'timestamp': 1002 }
		},
	'time':1498300809397,
	'source':'tetra'
	};

request.post(
    'http://127.0.0.1:3000/publish-fullstate',
    { json: payload },
    function (error, response, body) {
//        if (!error && response.statusCode == 200) {
        if (!error) {
            console.log(response.statusCode)
        }
    }
);