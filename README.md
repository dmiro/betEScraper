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
   "matchs":[{"team1":"RAYO VALLECANO","team2":"VALENCIA","goals":"0-4","result":"2"},
             {"team1":"OSASUNA","team2":"GETAFE","goals":"1-0","result":"1"},
             {"team1":"R. SOCIEDAD","team2":"GRANADA","goals":"2-2","result":"X"},
             {"team1":"ESPANYOL","team2":"R. MADRID","goals":"1-1","result":"X"},
             {"team1":"VALLADOLID","team2":"DEPORTIVO","goals":"1-0","result":"1"},
             {"team1":"AT. MADRID","team2":"BARCELONA","goals":"1-2","result":"2"},
             {"team1":"BETIS","team2":"CELTA","goals":"1-0","result":"1"},
             {"team1":"ATHLETIC CLUB","team2":"MALLORCA","goals":"2-1","result":"1"},
             {"team1":"SPORTING","team2":"CÓRDOBA","goals":"3-0","result":"1"},
             {"team1":"MIRANDÉS","team2":"PONFERRADINA","goals":"0-0","result":"X"},
             {"team1":"MURCIA","team2":"SABADELL","goals":"1-1","result":"X"},
             {"team1":"LUGO","team2":"ALMERÍA","goals":"3-5","result":"2"},
             {"team1":"ALCORCÓN","team2":"VILLARREAL","goals":"1-3","result":"2"},
             {"team1":"GIRONA","team2":"XEREZ","goals":"2-4","result":"2"},
             {"team1":"MÁLAGA","team2":"SEVILLA","goals":"0-0","result":"X"}]
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
    "matchs":[{"team1":"RAYO VALLECANO","team2":"VALENCIA","goals":"0-4","result":"2"},
              {"team1":"OSASUNA","team2":"GETAFE","goals":"1-0","result":"1"},
              {"team1":"R. SOCIEDAD","team2":"GRANADA","goals":"2-2","result":"X"},
              {"team1":"ESPANYOL","team2":"R. MADRID","goals":"1-1","result":"X"},
              {"team1":"VALLADOLID","team2":"DEPORTIVO","goals":"1-0","result":"1"},
              {"team1":"AT. MADRID","team2":"BARCELONA","goals":"1-2","result":"2"},
              {"team1":"BETIS","team2":"CELTA","goals":"1-0","result":"1"},
              {"team1":"ATHLETIC CLUB","team2":"MALLORCA","goals":"2-1","result":"1"},
              {"team1":"SPORTING","team2":"CÓRDOBA","goals":"3-0","result":"1"},
              {"team1":"MIRANDÉS","team2":"PONFERRADINA","goals":"0-0","result":"X"},
              {"team1":"MURCIA","team2":"SABADELL","goals":"1-1","result":"X"},
              {"team1":"LUGO","team2":"ALMERÍA","goals":"3-5","result":"2"},
              {"team1":"ALCORCÓN","team2":"VILLARREAL","goals":"1-3","result":"2"},
              {"team1":"GIRONA","team2":"XEREZ","goals":"2-4","result":"2"},
              {"team1":"MÁLAGA","team2":"SEVILLA","goals":"0-0","result":"X"}]
   },
   {"wday":"46",
    "date":"2013-05-05T00:00:00.000Z",
    "played":true,
    "matchs":[{"team1":["VALENCIA","team2":"OSASUNA","goals":"4-0","result":"1"},
              {"team1":["GETAFE","team2":"R. SOCIEDAD","goals":"2-1","result":"1"},
              {"team1":["GRANADA","team2":"MÁLAGA","goals":"1-0","result":"1"},
              {"team1":["SEVILLA","team2":"ESPANYOL","goals":"3-0","result":"1"},
              {"team1":["R. MADRID","team2":"VALLADOLID","goals":"4-3","result":"1"},
              {"team1":["BARCELONA","team2":"BETIS","goals":"4-2","result":"1"},
              {"team1":["MALLORCA","team2":"LEVANTE","goals":"1-1","result":"X"},
              {"team1":["ZARAGOZA","team2":"RAYO VALLECANO","goals":"3-0","result":"1"},
              {"team1":["LAS PALMAS","team2":"SPORTING","goals":"4-2","result":"1"},
              {"team1":["HÉRCULES","team2":"HUESCA","goals":"2-1","result":"1"},
              {"team1":["GUADALAJARA","team2":"MIRANDÉS","goals":"1-1","result":"X"},
              {"team1":["ALMERÍA","team2":"RACING","goals":"2-1","result":"1"},
              {"team1":["VILLARREAL","team2":"ELCHE","goals":"2-3","result":"2"},
              {"team1":["GIRONA","team2":"ALCORCÓN","goals":"3-2","result":"1"},
              {"team1":["DEPORTIVO","team2":"AT. MADRID","goals":"0-0","result":"X"}]
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
   "matchs":[{"team1":"RAYO VALLECANO","team2":"VALENCIA","goals":"0-4","result":"2"},
             {"team1":"OSASUNA","team2":"GETAFE","goals":"1-0","result":"1"},
             {"team1":"R. SOCIEDAD","team2":"GRANADA","goals":"2-2","result":"X"},
             {"team1":"ESPANYOL","team2":"R. MADRID","goals":"1-1","result":"X"},
             {"team1":"VALLADOLID","team2":"DEPORTIVO","goals":"1-0","result":"1"},
             {"team1":"AT. MADRID","team2":"BARCELONA","goals":"1-2","result":"2"},
             {"team1":"BETIS","team2":"CELTA","goals":"1-0","result":"1"},
             {"team1":"ATHLETIC CLUB","team2":"MALLORCA","goals":"2-1","result":"1"},
             {"team1":"SPORTING","team2":"CÓRDOBA","goals":"3-0","result":"1"},
             {"team1":"MIRANDÉS","team2":"PONFERRADINA","goals":"0-0","result":"X"},
             {"team1":"MURCIA","team2":"SABADELL","goals":"1-1","result":"X"},
             {"team1":"LUGO","team2":"ALMERÍA","goals":"3-5","result":"2"},
             {"team1":"ALCORCÓN","team2":"VILLARREAL","goals":"1-3","result":"2"},
             {"team1":"GIRONA","team2":"XEREZ","goals":"2-4","result":"2"},
             {"team1":"MÁLAGA","team2":"SEVILLA","goals":"0-0","result":"X"}]
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
    "matchs":[{"team1":"RAYO VALLECANO","team2":"VALENCIA","goals":"0-4","result":"2"},
              {"team1":"OSASUNA","team2":"GETAFE","goals":"1-0","result":"1"},
              {"team1":"R. SOCIEDAD","team2":"GRANADA","goals":"2-2","result":"X"},
              {"team1":"ESPANYOL","team2":"R. MADRID","goals":"1-1","result":"X"},
              {"team1":"VALLADOLID","team2":"DEPORTIVO","goals":"1-0","result":"1"},
              {"team1":"AT. MADRID","team2":"BARCELONA","goals":"1-2","result":"2"},
              {"team1":"BETIS","team2":"CELTA","goals":"1-0","result":"1"},
              {"team1":"ATHLETIC CLUB","team2":"MALLORCA","goals":"2-1","result":"1"},
              {"team1":"SPORTING","team2":"CÓRDOBA","goals":"3-0","result":"1"},
              {"team1":"MIRANDÉS","team2":"PONFERRADINA","goals":"0-0","result":"X"},
              {"team1":"MURCIA","team2":"SABADELL","goals":"1-1","result":"X"},
              {"team1":"LUGO","team2":"ALMERÍA","goals":"3-5","result":"2"},
              {"team1":"ALCORCÓN","team2":"VILLARREAL","goals":"1-3","result":"2"},
              {"team1":"GIRONA","team2":"XEREZ","goals":"2-4","result":"2"},
              {"team1":"MÁLAGA","team2":"SEVILLA","goals":"0-0","result":"X"}]
   },
   {"wday":"46",
    "date":"2013-05-05T00:00:00.000Z",
    "played":true,
    "matchs":[{"team1":["VALENCIA","team2":"OSASUNA","goals":"4-0","result":"1"},
              {"team1":["GETAFE","team2":"R. SOCIEDAD","goals":"2-1","result":"1"},
              {"team1":["GRANADA","team2":"MÁLAGA","goals":"1-0","result":"1"},
              {"team1":["SEVILLA","team2":"ESPANYOL","goals":"3-0","result":"1"},
              {"team1":["R. MADRID","team2":"VALLADOLID","goals":"4-3","result":"1"},
              {"team1":["BARCELONA","team2":"BETIS","goals":"4-2","result":"1"},
              {"team1":["MALLORCA","team2":"LEVANTE","goals":"1-1","result":"X"},
              {"team1":["ZARAGOZA","team2":"RAYO VALLECANO","goals":"3-0","result":"1"},
              {"team1":["LAS PALMAS","team2":"SPORTING","goals":"4-2","result":"1"},
              {"team1":["HÉRCULES","team2":"HUESCA","goals":"2-1","result":"1"},
              {"team1":["GUADALAJARA","team2":"MIRANDÉS","goals":"1-1","result":"X"},
              {"team1":["ALMERÍA","team2":"RACING","goals":"2-1","result":"1"},
              {"team1":["VILLARREAL","team2":"ELCHE","goals":"2-3","result":"2"},
              {"team1":["GIRONA","team2":"ALCORCÓN","goals":"3-2","result":"1"},
              {"team1":["DEPORTIVO","team2":"AT. MADRID","goals":"0-0","result":"X"}]
   }] 
``` 
