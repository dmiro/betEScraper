var BETS_NAMES_TYPES = {
    primitiva: 'LAPR',
    quiniela: 'LAQU'
};
 
// get bet "La Quiniela"
var getBetLAQU = function(err, window, agent, bets){
    
    var matchs = [];
    var played = true;
    var $ = window.jQuery;
    
    // all played
    $('div.contdepordos span.resuldeportab').each(function(index){
        var team1 = $('div.contdepordos span.resuldepor').eq(index*2).text();
        var team2 = $('div.contdepordos span.resuldepor').eq(index*2+1).text();
        var goals = $('div.contdepordos span.resuldeportabtres').eq(index).text();
        var result = $(this).text();
        matchs.push({teams : [team1,team2], goals:goals, result:result});
       
    });
    
    // played & no played
    var res = $('div.contdepor span');
    for (var i = 0, len = res.length; i < len; i+=5) {
        played = false;
        var team1 = $(res[i]).text();
        var team2 = $(res[i+1]).text();
        if ($(res[i+2]).attr("class") == "resuldepormarcador"){
            var goals = $(res[i+2]).text(); 
            matchs.push({teams : [team1,team2], goals:goals});
        } else if ($(res[i+2]).attr("class") == "fechoracan"){
            var date = $(res[i+2]).text();
            date = new Date( "{0}-{1}-{2}".format(date.substr(6, 4),date.substr(3, 2),date.substr(0, 2)));  
            matchs.push({teams : [team1,team2], date:date});
        }   
    }
        
    var items = $('span.caj-res-nod-tit').first().text().split(' ');
    var date = items[1];
    date = new Date( "{0}-{1}-{2}".format(date.substr(6, 4),date.substr(3, 2),date.substr(0, 2)));
    var wday = items[4];
    bets.push({wday:wday, date:date, played:played, matchs:matchs});
    console.log('getBets >','next agent','LAQU','result',bets.last());
    
    agent.next();  
};

// get bet "La Primitiva"
var getBetLAPR = function(err, window, agent, bets){
    
    var $ = window.jQuery;  
    var date = $('div.namefech').first().text().match(/\d{1,2}\/\d{1,2}\/\d{2,4}/gi,"")[0];
    date = new Date( "{0}-{1}-{2}".format(date.substr(6, 4),date.substr(3, 2),date.substr(0, 2)));
    var combination =  $('div.inforesult div#orden1 div.premespe').eq(2).text().numbers();
    var complementary =  $('div.inforesult div#orden1 div.premespe').eq(1).text();
    var refund =  $('div.inforesult div#orden1 div.premespe').eq(0).text();      
    bets.push({date:date, combination:combination, complementary:complementary, refund:refund});
    console.log('getBets >','next agent','LAPR','result',bets.last());
    
    agent.next();  
};
 
var getBet = function(betType, err, window, agent, bets) {
    switch (betType) {
    case 'LAQU':
        getBetLAQU(err, window, agent, bets);
        break;
    case 'LAPR':
        getBetLAPR(err, window, agent, bets);
        break;
    }
};
 
exports.BETS_NAMES_TYPES = BETS_NAMES_TYPES;
exports.getBet = getBet;

