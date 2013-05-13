var httpAgent = require('http-agent'),
    jsdom = require('jsdom'),
    request = require('request'),
    helper = require('./helper');

var BET_LIST_URL_TEMPLATE_HOST = 'www.loteriasyapuestas.es/index.php/mod.sorteos/mem.buscarListadoSorteos/juego.{0}/fecha_ini.{1}-{2}-{3}/fecha_fin.{4}-{5}-{6}'; 
var BET_LIST_URL_TEMPLATE_URL = 'pagina.{0}';
var BET_URL_TEMPLATE_HOST = 'www.loteriasyapuestas.es/index.php/mod.sorteos/mem.buscarDetalleSorteos/juego.{0}';
var BET_URL_TEMPLATE_URL = 'idsorteo.{0}';
var BET_LAST_URL_TEMPLATE_HOST = 'www.loteriasyapuestas.es/index.php/mod.sorteos/mem.buscarJornadaJSON/juego.{0}';
var JQUERY_URL = 'http://code.jquery.com/jquery-1.9.1.min.js';

// get bet "La Quiniela"
var getBetLAQU = function(err, window, agent, bets){
    
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
    $('div.contdepor span.fechoracan:contains("/")').each(function(index){
        played = false;
        var team1 = $('div.contdepor span.resuldepor').eq(index*2).text();
        var team2 = $('div.contdepor span.resuldepor').eq(index*2+1).text();
        var date = $(this).text();
        date = new Date( "{0}-{1}-{2}".format(date.substr(6, 4),date.substr(3, 2),date.substr(0, 2)));
        matchs.push({teams : [team1,team2], date:date});
    });
    
    var items = $('span.caj-res-nod-tit').first().text().split(' ');
    var date = items[1];
    date = new Date( "{0}-{1}-{2}".format(date.substr(6, 4),date.substr(3, 2),date.substr(0, 2)));
    var day = items[4];
    bets.push({day:day, date:date, played:played, matchs:matchs});
    console.log('getBets >','next agent','LAQU','result',bets.last());
    
    agent.next();  
}

// get bet "La Primitiva"
var getBetLAPR = function(err, window, agent, bets){
    
    var $ = window.jQuery;  
    var date = $('div.namefech').first().text().match(/\d{1,2}\/\d{1,2}\/\d{2,4}/gi,"")[0];
    date = new Date( "{0}-{1}-{2}".format(date.substr(6, 4),date.substr(3, 2),date.substr(0, 2)));
    var combination =  $('div.inforesult div#orden1 div.premespe').eq(2).text().replaceOccurrences('&nbsp',' ');
    var complementary =  $('div.inforesult div#orden1 div.premespe').eq(1).text();
    var refund =  $('div.inforesult div#orden1 div.premespe').eq(0).text();      
    bets.push({date:date, combination:combination, complementary:complementary, refund:refund});
    console.log('getBets >','next agent','LAPR','result',bets.last());
    
    agent.next();  
};

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
        function(err, window) 
        {  
            switch (betType)
            {
                case 'LAQU' :
                    getBetLAQU(err, window, agent, bets);
                break;
                case 'LAPR':
                    getBetLAPR(err, window, agent, bets);
                break;
            }  
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
          
    var host = BET_LIST_URL_TEMPLATE_HOST.format(betType,
        startDate.getFullYear(),
        startDate.getUTCMonthFormatted(),
        startDate.getUTCDateFormatted(),
        endDate.getFullYear(),
        endDate.getUTCMonthFormatted(),
        endDate.getUTCDateFormatted());
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

