var bets = require('./lib/bets');

bets.getBetsByDate('LAQU','20130301','20140129', function (error, result) {
    console.log(JSON.stringify(result));
    //console.log(require('util').inspect(result));
    console.log(result[3].matchs[0].teams[0]);
    console.log(result[3].matchs[0].teams[1]);
    console.log(result[3].matchs[0].goals);
    console.log(result[3].matchs[0].result);
});


// /**
//  * Module dependencies.
//  */

// var express = require('express')
//   , routes = require('./routes')
//   , user = require('./routes/user')
//   , http = require('http')
//   , path = require('path');

// var app = express();

// // all environments
// app.set('port', process.env.PORT || 3000);
// app.set('views', __dirname + '/views');
// app.set('view engine', 'jade');
// app.use(express.favicon());
// app.use(express.logger('dev'));
// app.use(express.bodyParser());
// app.use(express.methodOverride());
// app.use(app.router);
// app.use(express.static(path.join(__dirname, 'public')));

// // development only
// if ('development' == app.get('env')) {
//   app.use(express.errorHandler());
// }

// app.get('/', routes.index);
// app.get('/users', user.list);

// http.createServer(app).listen(app.get('port'), function(){
//   console.log('Express server listening on port ' + app.get('port'));
// });
