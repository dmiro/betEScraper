
var httpAgent = require('http-agent'),
    jsdom = require('jsdom');
    require('./helper');

var BET_LIST_URL_TEMPLATE_HOST = 'www.loteriasyapuestas.es/index.php/mod.sorteos/mem.buscarListadoSorteos/juego.{0}/fecha_ini.{1}-{2}-{3}/fecha_fin.{4}-{5}-{6}'; 
var BET_LIST_URL_TEMPLATE_URL = 'pagina.{0}';

var BET_URL_TEMPLATE_HOST = 'www.loteriasyapuestas.es/index.php/mod.sorteos/mem.buscarDetalleSorteos/juego.{0}';
var BET_URL_TEMPLATE_URL = 'idsorteo.{0}';

var BET_LAST_URL_TEMPLATE_HOST = 'www.loteriasyapuestas.es/index.php/mod.sorteos/mem.buscarJornadaJSON/juego.{0}';

var JQUERY_URL = 'http://code.jquery.com/jquery-1.9.1.min.js';


var getBets = function(betType, idBets,callback){
    var host = BET_URL_TEMPLATE_HOST.format(betType);
    var urls = idBets.format(BET_URL_TEMPLATE_URL);
    var agent = httpAgent.create(host, urls);
    var bets = []; 
    
    // start listener
    agent.addListener('start', function(agent) {
        console.log('getBets >','start agent','host:', host);
    });
    
    // next listener
    agent.addListener('next', function(err, agent) {
        
        console.log('getBets >','next agent','url:',agent.url);
        
        jsdom.env(
        {
            html: agent.body,
            scripts: [JQUERY_URL]
        }, function(err, window) 
        {
            
            var matchs = [];
            var played = true;
            var $ = window.jQuery;
            
            // played
            $('div.contdepordos span.resuldeportab').each(function(index){
                var team1 = $('div.contdepordos span.resuldepor').eq(index*2).text();
                var team2 = $('div.contdepordos span.resuldepor').eq(index*2+1).text();
                var goals = $('div.contdepordos span.resuldeportabtres').eq(index).text();
                var result = $(this).text();
                matchs.push({teams : [team1,team2], goals:goals, result:result});
               
            }); 
            // no played
            $('div.contdepor span.fechoracan').each(function(index){
                played = false;
                var team1 = $('div.contdepor span.resuldepor').eq(index*2).text();
                var team2 = $('div.contdepor span.resuldepor').eq(index*2+1).text();
                matchs.push({teams : [team1,team2], goals:'', result:''});
            });
            
            var items = $('span.caj-res-nod-tit').first().text().split(' ');
            var date = "{0}{1}{2}".format(items[1].substr(6, 4),items[1].substr(3, 2),items[1].substr(0, 2));
            var day = items[4];
            bets.push({day:day, date:date, played:played, matchs:matchs});
            console.log('getBets >','next agent','result',bets.last());
            
            agent.next();
            
        });
        
    });
    
    // stop listener
    agent.addListener('stop', function(agent) {
        console.log('getBets >','stop agent','host:', host);
        callback(null, bets);
    });

    agent.start();
};

exports.getLastBetPlayed = function(betType, callback) {

    var host = 'http://'+BET_LAST_URL_TEMPLATE_HOST.format(betType);

    var request = require('request');
    request(host, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var lastPlayedBet = JSON.parse(body);
            getBets(betType, [lastPlayedBet.idsorteo], callback);
        }
    });
};

/**
* Return bets by date range and one type 
* @param {String} bet type
* @param {String} start date in format 'yyyymmdd' (also included)
* @param {String} end date in format 'yyyymmdd' (also included)
* @param {function(err,result)} callback result function 
*/
exports.getBetsByDate = function(betType, startDate, endDate, callback) {
    
    var host = BET_LIST_URL_TEMPLATE_HOST.format(betType,
        startDate.substr(0, 4),
        startDate.substr(4, 2),
        startDate.substr(6, 2),
        endDate.substr(0, 4),
        endDate.substr(4, 2),
        endDate.substr(6, 2));
    var agent = httpAgent.create(host, [BET_LIST_URL_TEMPLATE_URL.format(1)]);
    var idBets = [];
    
    // start listener
    agent.addListener('start', function(agent) {
        console.log('getBetsByDate >','start agent','host:', host);
    });
    
    // next listener
    agent.addListener('next', function(err, agent) {
        
        console.log('getBetsByDate >','next agent','url:',agent.url);
        
        jsdom.env(
        {
            html: agent.body,
            scripts: [JQUERY_URL]
        }, function(err, window) 
        {
            
            var $ = window.jQuery;
            $('a[href~="javascript:"]' ).each(function(index) {
                var idBet = $(this).attr("href").firstNumber();
                if (idBet) {
                    console.log('getBetsByDate >','next agent','bet id:', idBet);
                    idBets.push(idBet);
                }
            });
            
            if (agent.url == 'pagina.1')
            {
                $('a[href~="#ancla"]' ).each(function(index) {
                    var page = $(this).text().firstNumber();
                    if ((page) && (page > 1)) {
                        console.log('getBetsByDate >','next agent','add pagina:', page);
                        agent.addUrl(BET_LIST_URL_TEMPLATE_URL.format(page));
                    }
                });
            }
        
            agent.next();
        });
        
    });

    // stop listener
    agent.addListener('stop', function(agent) {
        console.log('getBetsByDate >','stop agent','host:', host);
        getBets(betType, idBets, callback);
    });

    agent.start();
       
};



 

 
