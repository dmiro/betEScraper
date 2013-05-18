betEScraper [EN]
===============

The Bet Spanish Scraper
--------------------

Get Spanish State bets data and expose data through interface RESTful.
The source origin is http://www.loteriasyapuestas.es/
The purpose is facilitate the integration of historical betting in any application.

REST requests allowed
---------------------

- `/`
- `/{betType}`
- `/{betType}/{date}`
- `/{betType}?start={date}`
- `/{betType}?start={date}&end={date}`

### List of bets
```html
  http://localhost
  ["primitiva","quiniela"]
``` 
### Last bet
```html
  http://localhost/quiniela
 [{"wday":"47",
   "date":"2013-05-12T00:00:00.000Z",
   "played":true,
   "matchs":[{"teams":["RAYO VALLECANO","VALENCIA"],"goals":"0-4","result":"2"},
             {"teams":["OSASUNA","GETAFE"],"goals":"1-0","result":"1"},
             {"teams":["R. SOCIEDAD","GRANADA"],"goals":"2-2","result":"X"},
             {"teams":["ESPANYOL","R. MADRID"],"goals":"1-1","result":"X"},
             {"teams":["VALLADOLID","DEPORTIVO"],"goals":"1-0","result":"1"},
             {"teams":["AT. MADRID","BARCELONA"],"goals":"1-2","result":"2"},
             {"teams":["BETIS","CELTA"],"goals":"1-0","result":"1"},
             {"teams":["ATHLETIC CLUB","MALLORCA"],"goals":"2-1","result":"1"},
             {"teams":["SPORTING","CÓRDOBA"],"goals":"3-0","result":"1"},
             {"teams":["MIRANDÉS","PONFERRADINA"],"goals":"0-0","result":"X"},
             {"teams":["MURCIA","SABADELL"],"goals":"1-1","result":"X"},
             {"teams":["LUGO","ALMERÍA"],"goals":"3-5","result":"2"},
             {"teams":["ALCORCÓN","VILLARREAL"],"goals":"1-3","result":"2"},
             {"teams":["GIRONA","XEREZ"],"goals":"2-4","result":"2"},
             {"teams":["MÁLAGA","SEVILLA"],"goals":"0-0","result":"X"}]
  }]
```
### Bet by a certain date
```html
  http://localhost/primitiva/2013-05-16
  [{"date":"2013-05-16T00:00:00.000Z",
    "combination":["12","18","24","28","38","48"],
    "complementary":"32",
    "refund":"3"
  }]
```
### Bets by date range
```html
  http://localhost/quiniela?start=2013-05-01&end=2013-05-15
  [{"wday":"47",
    "date":"2013-05-12T00:00:00.000Z",
    "played":true,
    "matchs":[{"teams":["RAYO VALLECANO","VALENCIA"],"goals":"0-4","result":"2"},
              {"teams":["OSASUNA","GETAFE"],"goals":"1-0","result":"1"},
              {"teams":["R. SOCIEDAD","GRANADA"],"goals":"2-2","result":"X"},
              {"teams":["ESPANYOL","R. MADRID"],"goals":"1-1","result":"X"},
              {"teams":["VALLADOLID","DEPORTIVO"],"goals":"1-0","result":"1"},
              {"teams":["AT. MADRID","BARCELONA"],"goals":"1-2","result":"2"},
              {"teams":["BETIS","CELTA"],"goals":"1-0","result":"1"},
              {"teams":["ATHLETIC CLUB","MALLORCA"],"goals":"2-1","result":"1"},
              {"teams":["SPORTING","CÓRDOBA"],"goals":"3-0","result":"1"},
              {"teams":["MIRANDÉS","PONFERRADINA"],"goals":"0-0","result":"X"},
              {"teams":["MURCIA","SABADELL"],"goals":"1-1","result":"X"},
              {"teams":["LUGO","ALMERÍA"],"goals":"3-5","result":"2"},
              {"teams":["ALCORCÓN","VILLARREAL"],"goals":"1-3","result":"2"},
              {"teams":["GIRONA","XEREZ"],"goals":"2-4","result":"2"},
              {"teams":["MÁLAGA","SEVILLA"],"goals":"0-0","result":"X"}]
   },
   {"wday":"46",
    "date":"2013-05-05T00:00:00.000Z",
    "played":true,
    "matchs":[{"teams":["VALENCIA","OSASUNA"],"goals":"4-0","result":"1"},
              {"teams":["GETAFE","R. SOCIEDAD"],"goals":"2-1","result":"1"},
              {"teams":["GRANADA","MÁLAGA"],"goals":"1-0","result":"1"},
              {"teams":["SEVILLA","ESPANYOL"],"goals":"3-0","result":"1"},
              {"teams":["R. MADRID","VALLADOLID"],"goals":"4-3","result":"1"},
              {"teams":["BARCELONA","BETIS"],"goals":"4-2","result":"1"},
              {"teams":["MALLORCA","LEVANTE"],"goals":"1-1","result":"X"},
              {"teams":["ZARAGOZA","RAYO VALLECANO"],"goals":"3-0","result":"1"},
              {"teams":["LAS PALMAS","SPORTING"],"goals":"4-2","result":"1"},
              {"teams":["HÉRCULES","HUESCA"],"goals":"2-1","result":"1"},
              {"teams":["GUADALAJARA","MIRANDÉS"],"goals":"1-1","result":"X"},
              {"teams":["ALMERÍA","RACING"],"goals":"2-1","result":"1"},
              {"teams":["VILLARREAL","ELCHE"],"goals":"2-3","result":"2"},
              {"teams":["GIRONA","ALCORCÓN"],"goals":"3-2","result":"1"},
              {"teams":["DEPORTIVO","AT. MADRID"],"goals":"0-0","result":"X"}]
   }] 
``` 


betEScraper [ES]
===============

The Bet Spanish Scraper
--------------------

Obtiene información de Loterias y Apuestas del Estado y expone los datos a traves de una interface RESTful.
La fuente original está en http://www.loteriasyapuestas.es/
El proposito es facilitar la integración del histórico de apuestas en cualquier aplicación.


Peticiones REST permitidas
---------------------

- `/`
- `/{betType}`
- `/{betType}/{date}`
- `/{betType}?start={date}`
- `/{betType}?start={date}&end={date}`

### Lista de apuestas
```html
  http://localhost
  ["primitiva","quiniela"]
``` 
### Última apuesta
```html
  http://localhost/quiniela
 [{"wday":"47",
   "date":"2013-05-12T00:00:00.000Z",
   "played":true,
   "matchs":[{"teams":["RAYO VALLECANO","VALENCIA"],"goals":"0-4","result":"2"},
             {"teams":["OSASUNA","GETAFE"],"goals":"1-0","result":"1"},
             {"teams":["R. SOCIEDAD","GRANADA"],"goals":"2-2","result":"X"},
             {"teams":["ESPANYOL","R. MADRID"],"goals":"1-1","result":"X"},
             {"teams":["VALLADOLID","DEPORTIVO"],"goals":"1-0","result":"1"},
             {"teams":["AT. MADRID","BARCELONA"],"goals":"1-2","result":"2"},
             {"teams":["BETIS","CELTA"],"goals":"1-0","result":"1"},
             {"teams":["ATHLETIC CLUB","MALLORCA"],"goals":"2-1","result":"1"},
             {"teams":["SPORTING","CÓRDOBA"],"goals":"3-0","result":"1"},
             {"teams":["MIRANDÉS","PONFERRADINA"],"goals":"0-0","result":"X"},
             {"teams":["MURCIA","SABADELL"],"goals":"1-1","result":"X"},
             {"teams":["LUGO","ALMERÍA"],"goals":"3-5","result":"2"},
             {"teams":["ALCORCÓN","VILLARREAL"],"goals":"1-3","result":"2"},
             {"teams":["GIRONA","XEREZ"],"goals":"2-4","result":"2"},
             {"teams":["MÁLAGA","SEVILLA"],"goals":"0-0","result":"X"}]
  }]
```
### Apuesta para una determinada fecha
```html
  http://localhost/primitiva/2013-05-16
  [{"date":"2013-05-16T00:00:00.000Z",
    "combination":["12","18","24","28","38","48"],
    "complementary":"32",
    "refund":"3"
  }]
```
### Apuestas por rango de fechas
```html
  http://localhost/quiniela?start=2013-05-01&end=2013-05-15
  [{"wday":"47",
    "date":"2013-05-12T00:00:00.000Z",
    "played":true,
    "matchs":[{"teams":["RAYO VALLECANO","VALENCIA"],"goals":"0-4","result":"2"},
              {"teams":["OSASUNA","GETAFE"],"goals":"1-0","result":"1"},
              {"teams":["R. SOCIEDAD","GRANADA"],"goals":"2-2","result":"X"},
              {"teams":["ESPANYOL","R. MADRID"],"goals":"1-1","result":"X"},
              {"teams":["VALLADOLID","DEPORTIVO"],"goals":"1-0","result":"1"},
              {"teams":["AT. MADRID","BARCELONA"],"goals":"1-2","result":"2"},
              {"teams":["BETIS","CELTA"],"goals":"1-0","result":"1"},
              {"teams":["ATHLETIC CLUB","MALLORCA"],"goals":"2-1","result":"1"},
              {"teams":["SPORTING","CÓRDOBA"],"goals":"3-0","result":"1"},
              {"teams":["MIRANDÉS","PONFERRADINA"],"goals":"0-0","result":"X"},
              {"teams":["MURCIA","SABADELL"],"goals":"1-1","result":"X"},
              {"teams":["LUGO","ALMERÍA"],"goals":"3-5","result":"2"},
              {"teams":["ALCORCÓN","VILLARREAL"],"goals":"1-3","result":"2"},
              {"teams":["GIRONA","XEREZ"],"goals":"2-4","result":"2"},
              {"teams":["MÁLAGA","SEVILLA"],"goals":"0-0","result":"X"}]
   },
   {"wday":"46",
    "date":"2013-05-05T00:00:00.000Z",
    "played":true,
    "matchs":[{"teams":["VALENCIA","OSASUNA"],"goals":"4-0","result":"1"},
              {"teams":["GETAFE","R. SOCIEDAD"],"goals":"2-1","result":"1"},
              {"teams":["GRANADA","MÁLAGA"],"goals":"1-0","result":"1"},
              {"teams":["SEVILLA","ESPANYOL"],"goals":"3-0","result":"1"},
              {"teams":["R. MADRID","VALLADOLID"],"goals":"4-3","result":"1"},
              {"teams":["BARCELONA","BETIS"],"goals":"4-2","result":"1"},
              {"teams":["MALLORCA","LEVANTE"],"goals":"1-1","result":"X"},
              {"teams":["ZARAGOZA","RAYO VALLECANO"],"goals":"3-0","result":"1"},
              {"teams":["LAS PALMAS","SPORTING"],"goals":"4-2","result":"1"},
              {"teams":["HÉRCULES","HUESCA"],"goals":"2-1","result":"1"},
              {"teams":["GUADALAJARA","MIRANDÉS"],"goals":"1-1","result":"X"},
              {"teams":["ALMERÍA","RACING"],"goals":"2-1","result":"1"},
              {"teams":["VILLARREAL","ELCHE"],"goals":"2-3","result":"2"},
              {"teams":["GIRONA","ALCORCÓN"],"goals":"3-2","result":"1"},
              {"teams":["DEPORTIVO","AT. MADRID"],"goals":"0-0","result":"X"}]
   }] 
``` 
