const assert = require('node:assert/strict');
const test = require('node:test');

test('Send update to server', async() => {
  const payload = { 
    'steps':[
      { 'stepid': '01.1', 'name':'Inspection', 'classCSS':'HeadCell_01_1' }, 
      { 'stepid': '02.0', 'name':'Wash (wait)', 'classCSS':'HeadCell_02_0' }, 
      { 'stepid': '02.1', 'name':'Wash', 'classCSS':'HeadCell_02_1' }, 
      { 'stepid': '04.0', 'name':'Inspection at the lift (wait)', 'classCSS':'HeadCell_04_0' }, 
      { 'stepid': '04.1', 'name':'Inspection at the lift', 'classCSS':'HeadCell_04_1' }, 
      { 'stepid': '05.0', 'name':'Execution (wait)', 'classCSS':'HeadCell_05_0' }, 
      { 'stepid': '05.1', 'name':'Execution', 'classCSS':'HeadCell_05_1' }, 
      { 'stepid': '06.0', 'name':'Quality control (wait)', 'classCSS':'HeadCell_06_0' }, 
      { 'stepid': '06.1', 'name':'Quality control', 'classCSS':'HeadCell_06_1' }, 
      { 'stepid': '07.1', 'name':'Preparation of documents', 'classCSS':'HeadCell_07_1' }, 
      { 'stepid': '08.0', 'name':'Delivery (wait)', 'classCSS':'HeadCell_08_0' }, 
      { 'stepid': '08.1', 'name':'Delivery', 'classCSS':'HeadCell_08_1' }
      ],
    'cars':{
      'a001bc': { 'carid': 'a001bc', 'stepid':'01.1' }, 
      'd007em': { 'carid': 'd007em', 'stepid':'01.1' }, 
      'd007ee': { 'carid': 'd007ee', 'stepid':'02.1' }
      },
    'time':1498300809397,
    'source':'tetra'
    };
  
  const response = await fetch(
    'http://127.0.0.1:3000/publish-fullstate',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }
  );
  assert.equal(
    response.status,
    200,
  );

  const update1 = { 
    'cars':{
      'a001bc': { 'carid': 'a001bc', 'stepid':'02.0' }
      },
    'time_prev':1498300809397,
    'time':1498300851588,
    'source':'tetra'
  };
  
  const update1Response = await fetch(
    'http://127.0.0.1:3000/publish-update',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(update1),
    }
  );
  assert.equal(
    update1Response.status,
    200,
  );

  const update2 = { 
    'cars':{ 'd007ee': '' },
    'time_prev':1498300851588,
    'time':1498301007768,
    'source':'tetra'
  };
  
  const update2Response = await fetch(
    'http://127.0.0.1:3000/publish-update',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(update2),
    }
  );
  assert.equal(
    update2Response.status,
    200,
  );
});
