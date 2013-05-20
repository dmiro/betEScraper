var httpAgent = require('http-agent'),
    jsdom = require('jsdom'),
    request = require('request'),
    helper = require('./helper'),
    getBet = require('./bets-types').getBet;

var BET_LIST_URL_TEMPLATE_HOST = 'www.loteriasyapuestas.es/index.php/mod.sorteos/mem.buscarListadoSorteos/juego.{0}/fecha_ini.{1}/fecha_fin.{2}'; 
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
        jsdom.env({
            html: agent.body,
            scripts: [JQUERY_URL]
        }, 
        function(err, window) { 
            getBet(betType, err, window, agent, bets);
        });  
    });
    
    // stop listener
    agent.addListener('stop', function(agent) {
        console.log('getBets >','stop agent','host:', host);
        callback(null, bets);
    });

    agent.start();
};

/**
* Return last bet played  
* @param {String} bet type
* @param {function(err,result)} callback result function 
*/
exports.getLastBetPlayed = function(betType, callback) {
    
    var host = 'http://'+BET_LAST_URL_TEMPLATE_HOST.format(betType);
    
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
* @param {Date} start date (also included)
* @param {Date} end date (also included)
* @param {function(err,result)} callback result function 
*/
exports.getBetsByDate = function(betType, startDate, endDate, callback) {
          
    var host = BET_LIST_URL_TEMPLATE_HOST.format(betType, startDate.format('%Y-%m-%d',true), endDate.format('%Y-%m-%d',true));
    var agent = httpAgent.create(host, [BET_LIST_URL_TEMPLATE_URL.format(1)]);
    var idBets = [];
    
    // start listener
    agent.addListener('start', function(agent) {
        console.log('getBetsByDate >','start agent','host:', host);
    });
    
    // next listener
    agent.addListener('next', function(err, agent) {
        
        console.log('getBetsByDate >','next agent','url:',agent.url);
        
        jsdom.env({
            html: agent.body,
            scripts: [JQUERY_URL]
        }, function(err, window) {
            
            var $ = window.jQuery;
            $('a[href~="javascript:"]' ).each(function(index) {
                var idBet = $(this).attr("href").firstNumber();
                if ((idBet) && (idBets.indexOf(idBet)===-1)) {
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

