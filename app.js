var http = require('http'),
    bets = require('./lib/bets'), 
    route = require('router')();

var betsNameTypes = [];
    betsNameTypes['primitiva'] = 'LAPR';
    betsNameTypes['quiniela'] = 'LAQU';
    
var BET_TYPE_NOT_EXIST = 'bet type does not exist';

//
// Last bet
//
route.get('/{betNameType}/last', function(req, res) {
    
    if (!betsNameTypes[req.params.betNameType]){
        res.writeHead(400);
        res.end(BET_TYPE_NOT_EXIST);
        console.log(BET_TYPE_NOT_EXIST);
        return;    
    } 
    bets.getLastBetPlayed(betsNameTypes[req.params.betNameType], function (error, result) {
        if (error){
            res.writeHead(400);
            res.end(JSON.stringify(error));
            console.log(JSON.stringify(error));
            return;
        }
        res.writeHead(200);
        res.end(JSON.stringify(result));
        console.log(JSON.stringify(result));
    }); 
});

//
// One date
//
route.get('/{betNameType}/{date}', function(req, res) {
    
    if (!betsNameTypes[req.params.betNameType]){
        res.writeHead(400);
        res.end(BET_TYPE_NOT_EXIST);
        console.log(BET_TYPE_NOT_EXIST);
        return;    
    } 
    var date = new Date(req.params.date);
    bets.getBetsByDate(betsNameTypes[req.params.betNameType], date, date, function (error, result) {
        if (error){
            res.writeHead(400);
            res.end(JSON.stringify(error));
            console.log(JSON.stringify(error));
            return;
        }
        res.writeHead(200);
        res.end(JSON.stringify(result));
        console.log(JSON.stringify(result));
    }); 
});

//
// Date range
//
route.get('/{betNameType}/start/{start}/end/{end}', function(req, res) {
 
    if (!betsNameTypes[req.params.betNameType]){
        res.writeHead(400);
        res.end(BET_TYPE_NOT_EXIST);
        console.log(BET_TYPE_NOT_EXIST);
        return;    
    } 
    var startDate = new Date(req.params.start);
    var endDate = ( req.params.end ? new Date(req.params.end) : new Date());
    bets.getBetsByDate(betsNameTypes[req.params.betNameType], startDate, endDate, function (error, result) {
        if (error){
            res.writeHead(400);
            res.end(JSON.stringify(error));
            console.log(JSON.stringify(error));
            return;
        }
        res.writeHead(200);
        res.end(JSON.stringify(result));
        console.log(JSON.stringify(result));
    }); 
    
});

http.createServer(route).listen(process.env.PORT);
console.log('server listen IP:',process.env.IP,'PORT:',process.env.PORT,'...');


