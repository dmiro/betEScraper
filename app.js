var http = require('http'),
    bets = require('./lib/bets'),
    helper = require('./lib/helper'),
    url = require('url'),
    route = require('router')(),
    jstoxml = require("jstoxml"),
    BETS_NAMES_TYPES = require('./lib/bets-types').BETS_NAMES_TYPES;

var ERROR_BET_TYPE_NOT_EXIST = {httpResponse:400, error:'BetTypeNotExist', message:'Bet type does not exist'};
var ERROR_INVALID_START_DATE = {httpResponse:400, error:'StartDateNotValid', message:'Start date is not a valid date'};
var ERROR_INVALID_END_DATE = {httpResponse:400, error:'EndDateNotValid', message:'End date is not a valid date'};
var ERROR_INVALID_DATE = {httpResponse:400, error:'DateNotValid', message:'Date is not a valid date'};
var ERROR_FILE_NOT_FOUND = {httpResponse:404, error:'FileNotFound', message:'File not found'};

var response = function(req, res, httpResponse, obj) { 
    // json format
    if (/json/.test(req.headers.accept) || /text\/html/.test(req.headers.accept)) {
        res.writeHead(httpResponse, {"Content-Type": "application/json;charset=UTF-8"});
        res.write(JSON.stringify(obj));
        res.end(); 
        console.log('response >','httpResponse:', httpResponse, 'obj:', JSON.stringify(obj));  
    // xml format
    } else if (/application\/xml/.test(req.headers.accept)) {
        res.writeHead(httpResponse, {"Content-Type": "text/xml;charset=UTF-8"});
        res.write(jstoxml.toXML(helper.singularizeArrays(obj), {header: true, indent: '  '})); 
        res.end(); 
        console.log('response >','httpResponse:', httpResponse, 'obj:', JSON.stringify(obj));    
    // format not accepted
    } else {
        res.writeHead(406);
        res.end(); 
        console.log('response >','httpResponse:', 406, 'obj:', JSON.stringify(obj));
    }
};

var sendError = function(req, res, error) {
    if (error.httpResponse)
        response(req, res, error.httpResponse, {error:error});
    else 
        response(req, res, error.httpResponse, {error:{httpResponse:400, error:'Error', message:error}});
};

var sendResponse = function(req, res, obj) {
    response(req, res, 200, {results:obj}); // <-- ARREGLAR!!!
};

//
// favicon.ico
//
route.get('/favicon.ico', function(req, res) {   
    sendError(req, res, ERROR_FILE_NOT_FOUND);
});
  
//
// Bet types
//
route.get('/', function(req, res) {   
    console.log('/ >',req.url);   
    return sendResponse(req, res, Object.keys(BETS_NAMES_TYPES)) ;   
});

//
// One date
//
route.get('/{betNameType}/{date}', function(req, res) {
    
    console.log('/{betNameType}/{date} >',req.url);
    
    var betType = BETS_NAMES_TYPES[req.params.betNameType];
     
    if (!betType) {
        return sendError(req, res, ERROR_BET_TYPE_NOT_EXIST);
    }
    
    var date = new Date(req.params.date);
    if (!helper.isValidDate(date)) {
        return sendError(req, res, ERROR_INVALID_DATE);
    }
    
    bets.getBetsByDate(betType, date, date, function (error, result) {
        if (error) {
            return sendError(req, res, error);
        }
        return sendResponse(req, res, result);
    }); 
});

//
// Date range or last bet
//
route.get('/{betNameType}', function(req, res) {

    console.log('/{betNameType} >', req.url);
    
    var betType = BETS_NAMES_TYPES[req.params.betNameType];

    if (!betType) {
        return sendError(req, res, ERROR_BET_TYPE_NOT_EXIST);
    }

    var query = url.parse(req.url, true).query;

    // last bet
    if (Object.keys(query).length === 0) {
        bets.getLastBetPlayed(betType, function(error, result) {
            if (error) {
                return sendError(req, res, error);
            }
            return sendResponse(req, res, result);
        });
    }
    
    // date range
    else {

        var startDate = new Date(query.start);
        var endDate = (query.end ? new Date(query.end) : new Date());

        if (!helper.isValidDate(startDate)) {
            return sendError(req, res, ERROR_INVALID_START_DATE);
        }
        if (!helper.isValidDate(endDate)) {
            return sendError(req, res, ERROR_INVALID_END_DATE);
        }

        bets.getBetsByDate(betType, startDate, endDate, function(error, result) {
            if (error) {
                return sendError(req, res, error);
            }
            return sendResponse(req, res, result);
        });
    }
});

http.createServer(route).listen(process.env.PORT);
console.log('server listen IP:',process.env.IP,'PORT:',process.env.PORT,'...');


