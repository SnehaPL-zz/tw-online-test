const request = require('request');

const requestConfig = {
    'url': `https://http-hunt.thoughtworks-labs.net/challenge/input`,
    'method': 'GET',
    'headers': { 'userId': 'sOVrIMOkA' }
};

function isToday(end_date)
{
    const today=new Date();
    var year=end_date.getFullYear();
    var month=end_date.getMonth();
    var date=end_date.getDate();
    var dateToday=today.getDate();
    var monthToday=today.getMonth();
    var yearToday=today.getFullYear();
    

    if(year == yearToday && month == monthToday && date == dateToday) {
        return true;
    }
    return false;
}

function afterToday(end_date)
{
    const today=new Date();
    var year=end_date.getFullYear();
    var month=end_date.getMonth();
    var date=end_date.getDate();
    var dateToday=today.getDate();
    var monthToday=today.getMonth();
    var yearToday=today.getFullYear();
    
    
    if(year > yearToday) {
        return true;
    }

    if(year == yearToday && month > monthToday) {
        return true;
    }

    if(year == yearToday && month == monthToday && date > dateToday) {
        return true;
    }

    return false;
}


function beforeToday(end_date)
{

    const today=new Date();
    var year=end_date.getFullYear();
    var month=end_date.getMonth();
    var date=end_date.getDate();
    var dateToday=today.getDate();
    var monthToday=today.getMonth();
    var yearToday=today.getFullYear();
    
    
    if(year < yearToday) {
        return true;
    }

    if(year == yearToday && month < monthToday) {
        return true;
    }

    if(year == yearToday && month == monthToday && date < dateToday) {
        return true;
    }

    return false;
}


request(requestConfig, (err, res) => {
    const prd = JSON.parse(res.body);
    console.log(prd);
    var count=0;
    var obj={};
    for(i=0;i<prd.length;i++)
    {
        var end_date=new Date(prd[i].endDate);
        var start_date=new Date(prd[i].startDate);
        const today=new Date();
        var strdate=prd[i].endDate;
        var category=prd[i].category;
        if( (beforeToday(start_date) && (afterToday(end_date) || strdate==null)))
        {
            console.log("adding new ele:", prd[i]);
            if(obj[category]===undefined)
            {
                obj[category]=1;
            }
            else
            {
                obj[category]++;
            }
        }
    }
    console.log(obj);

     const request_post = {
        'url': `https://http-hunt.thoughtworks-labs.net/challenge/output`,
        'method': 'POST',
        'body': JSON.stringify(obj),
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