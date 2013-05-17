var http = require('http'),
    bets = require('./lib/bets'),
    helper = require('./lib/helper'),
    url = require('url'),
    route = require('router')();

var betsNameTypes = [];
    betsNameTypes.primitiva = 'LAPR';
    betsNameTypes.quiniela = 'LAQU';
    
var BET_TYPE_NOT_EXIST = 'Bet type does not exist';
var INVALID_START_DATE = 'Start date is not a valid date';
var INVALID_END_DATE = 'End date is not a valid date';
var INVALID_DATE = 'Date is not a valid date';

var error400 = function(res, error) {
    res.writeHead(400, {"Content-Type": "text/html;charset=UTF-8"});
    res.write(JSON.stringify(error));
    res.end();
    console.log(error);  
};

var response200 = function(res, result) {
    res.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"});
    res.write(JSON.stringify(result));
    res.end();
    console.log(JSON.stringify(result));
};

//
// One date
//
route.get('/{betNameType}/{date}', function(req, res) {
    
    console.log('/{betNameType}/{date} >',req.url);
     
    if (!betsNameTypes[req.params.betNameType]) {
        return error400(res, BET_TYPE_NOT_EXIST);
    }
    var date = new Date(req.params.date);
    if (!helper.isValidDate(date)) {
        return error400(res, INVALID_DATE);
    }
    bets.getBetsByDate(betsNameTypes[req.params.betNameType], date, date, function (error, result) {
        if (error) {
            return error400(res, error);
        }
        return response200(res, result);
    }); 
});

//
// Date range or last bet
//
route.get('/{betNameType}', function(req, res) {

    console.log('/{betNameType} >', req.url);

    if (!betsNameTypes[req.params.betNameType]) {
        return error400(res, BET_TYPE_NOT_EXIST);
    }

    var query = url.parse(req.url, true).query;

    // last bet
    if (!Object.keys(query).length) {
        bets.getLastBetPlayed(betsNameTypes[req.params.betNameType], function(error, result) {
            if (error) {
                return error400(res, error);
            }
            return response200(res, result);
        });
    }
    
    // date range
    else {

        var startDate = new Date(query.start);
        var endDate = (query.end ? new Date(query.end) : new Date());

        if (!helper.isValidDate(startDate)) {
            return error400(res, INVALID_START_DATE);
        }
        if (!helper.isValidDate(endDate)) {
            return error400(res, INVALID_END_DATE);
        }

        bets.getBetsByDate(betsNameTypes[req.params.betNameType], startDate, endDate, function(error, result) {
            if (error) {
                return error400(res, error);
            }
            return response200(res, result);
        });
    }

});

http.createServer(route).listen(process.env.PORT);
console.log('server listen IP:',process.env.IP,'PORT:',process.env.PORT,'...');


