const request = require('request');

const requestConfig = {
    'url': `https://http-hunt.thoughtworks-labs.net/challenge/input`,
    'method': 'GET',
    'headers': { 'userId': 'sOVrIMOkA' }
};

request(requestConfig, (err, res) => {
    const prd = JSON.parse(res.body);
    console.log(prd);
    var count=0;
    for(i=0;i<prd.length;i++)
    {
        var end_date=new Date(prd[i].endDate);
        const today=new Date();
        var strdate=prd[i].endDate
        if(end_date>=today || strdate==null)
        {
            count=count+1;
        }
    }
    const output = {
        "count": count
    }
    console.log(output);

   const request_post = {
        'url': `https://http-hunt.thoughtworks-labs.net/challenge/output`,
        'method': 'POST',
        'body': JSON.stringify(output),
        'headers': {
            'userId': 'sOVrIMOkA',
            'content-type': 'application/json'
        }
    };
    console.log(request_post);
    request(request_post, function (err, res, body) {
        if (err) {
            console.error('error posting json: ', err)
            throw err
        }
        var headers = res.headers;
        var statusCode = res.statusCode;
        console.log('headers: ', headers)
        console.log('statusCode: ', statusCode)
        console.log('body: ', body)
    });

});