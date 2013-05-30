> #### Version 1.0.0
> - Betting supported: Quiniela and Primitiva
> - The result is available in JSON, XML and CSV.
> - Three requests available: available bet types, latest bet and bets on a range of dates.

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
  {"results":[{
     "wday":"48",
     "date":"2013-05-19T00:00:00.000Z",
     "played":true,
     "matchs":[{"team1":"GETAFE","team2":"VALENCIA","goals1":"0","goals2":"1","result":"2"},
               {"team1":"GRANADA","team2":"OSASUNA","goals1":"3","goals2":"0","result":"1"},
               {"team1":"SEVILLA","team2":"R. SOCIEDAD","goals1":"1","goals2":"2","result":"2"},
               {"team1":"BARCELONA","team2":"VALLADOLID","goals1":"2","goals2":"1","result":"1"},
               {"team1":"MALLORCA","team2":"BETIS","goals1":"1","goals2":"0","result":"1"},
               {"team1":"ZARAGOZA","team2":"ATHLETIC CLUB","goals1":"1","goals2":"2","result":"2"},
               {"team1":"LEVANTE","team2":"RAYO VALLECANO","goals1":"2","goals2":"3","result":"2"},
               {"team1":"CÓRDOBA","team2":"HUESCA","goals1":"2","goals2":"2","result":"X"},
               {"team1":"LAS PALMAS","team2":"RECREATIVO","goals1":"0","goals2":"0","result":"X"},
               {"team1":"HÉRCULES","team2":"MIRANDÉS","goals1":"1","goals2":"0","result":"1"},
               {"team1":"PONFERRADINA","team2":"NUMANCIA","goals1":"1","goals2":"1","result":"X"},
               {"team1":"SABADELL","team2":"RACING","goals1":"0","goals2":"2","result":"2"},
               {"team1":"ALMERÍA","team2":"ELCHE","goals1":"2","goals2":"1","result":"1"},
               {"team1":"VILLARREAL","team2":"GIRONA","goals1":"4","goals2":"1","result":"1"},
               {"team1":"DEPORTIVO","team2":"ESPANYOL","goals1":"2","goals2":"0","result":"1"}]
               }]
  }  
```

### Bet by a certain date
```html
  http://localhost/primitiva/2013-05-16
  {results:[{
     "date":"2013-05-16T00:00:00.000Z",
     "combination":["12","18","24","28","38","48"],
     "complementary":"32",
     "refund":"3"}]
  }
```
### Bets by date range
```html
  http://localhost/quiniela?start=2013-05-01&end=2013-05-15
  {"results":[{
     "wday":"47",
     "date":"2013-05-12T00:00:00.000Z",
     "played":true,
     "matchs":[{"team1":"RAYO VALLECANO","team2":"VALENCIA","goals1":"0","goals2":"4","result":"2"},
               {"team1":"OSASUNA","team2":"GETAFE","goals1":"1","goals2":"0","result":"1"},
               {"team1":"R. SOCIEDAD","team2":"GRANADA","goals1":"2","goals2":"2","result":"X"},
               {"team1":"ESPANYOL","team2":"R. MADRID","goals1":"1","goals2":"1","result":"X"},
               {"team1":"VALLADOLID","team2":"DEPORTIVO","goals1":"1","goals2":"0","result":"1"},
               {"team1":"AT. MADRID","team2":"BARCELONA","goals1":"1","goals2":"2","result":"2"},
               {"team1":"BETIS","team2":"CELTA","goals1":"1","goals2":"0","result":"1"},
               {"team1":"ATHLETIC CLUB","team2":"MALLORCA","goals1":"2","goals2":"1","result":"1"},
               {"team1":"SPORTING","team2":"CÓRDOBA","goals1":"3","goals2":"0","result":"1"},
               {"team1":"MIRANDÉS","team2":"PONFERRADINA","goals1":"0","goals2":"0","result":"X"},
               {"team1":"MURCIA","team2":"SABADELL","goals1":"1","goals2":"1","result":"X"},
               {"team1":"LUGO","team2":"ALMERÍA","goals1":"3","goals2":"5","result":"2"},
               {"team1":"ALCORCÓN","team2":"VILLARREAL","goals1":"1","goals2":"3","result":"2"},
               {"team1":"GIRONA","team2":"XEREZ","goals1":"2","goals2":"4","result":"2"},
               {"team1":"MÁLAGA","team2":"SEVILLA","goals1":"0","goals2":"0","result":"X"}]
    },{
      "wday":"46",
      "date":"2013-05-05T00:00:00.000Z",
      "played":true,
      "matchs":[{"team1":"VALENCIA","team2":"OSASUNA","goals1":"4","goals2":"0","result":"1"},
                {"team1":"GETAFE","team2":"R. SOCIEDAD","goals1":"2","goals2":"1","result":"1"},
                {"team1":"GRANADA","team2":"MÁLAGA","goals1":"1","goals2":"0","result":"1"},
                {"team1":"SEVILLA","team2":"ESPANYOL","goals1":"3","goals2":"0","result":"1"},
                {"team1":"R. MADRID","team2":"VALLADOLID","goals1":"4","goals2":"3","result":"1"},
                {"team1":"BARCELONA","team2":"BETIS","goals1":"4","goals2":"2","result":"1"},
                {"team1":"MALLORCA","team2":"LEVANTE","goals1":"1","goals2":"1","result":"X"},
                {"team1":"ZARAGOZA","team2":"RAYO VALLECANO","goals1":"3","goals2":"0","result":"1"},
                {"team1":"LAS PALMAS","team2":"SPORTING","goals1":"4","goals2":"2","result":"1"},
                {"team1":"HÉRCULES","team2":"HUESCA","goals1":"2","goals2":"1","result":"1"},
                {"team1":"GUADALAJARA","team2":"MIRANDÉS","goals1":"1","goals2":"1","result":"X"},
                {"team1":"ALMERÍA","team2":"RACING","goals1":"2","goals2":"1","result":"1"},
                {"team1":"VILLARREAL","team2":"ELCHE","goals1":"2","goals2":"3","result":"2"},
                {"team1":"GIRONA","team2":"ALCORCÓN","goals1":"3","goals2":"2","result":"1"},
                {"team1":"DEPORTIVO","team2":"AT. MADRID","goals1":"0","goals2":"0","result":"X"}]
        }]
   }
```

Other formats response
---------------------

The default response format is JSON REST service but are also available
XML and CSV formats.

### Formats (HTTP request header)
- JSON: `content-type=json` or `content-type=text/html`
- XML: `content-type=application/xml`
- CSV: `content-type=application/vnd.ms-excel` or `content-type=application/csv`

### XML format example:

```xml
http://localhost/quiniela
<?xml version="1.0" encoding="UTF-8"?>
<results>
    <result>
        <wday>48</wday>
        <date>2013-05-19T00:00:00.000Z</date>
        <played>true</played>
        <matchs>
            <match>
                <team1>GETAFE</team1>
                <team2>VALENCIA</team2>
                <goals1>0</goals1>
                <goals2>1</goals2>
                <result>2</result>
            </match>
            <match>
                <team1>GRANADA</team1>
                <team2>OSASUNA</team2>
                <goals1>3</goals1>
                <goals2>0</goals2>
                <result>1</result>
            </match>
            <match>
                <team1>SEVILLA</team1>
                <team2>R. SOCIEDAD</team2>
                <goals1>1</goals1>
                <goals2>2</goals2>
                <result>2</result>
            </match>
            <match>
                <team1>BARCELONA</team1>
                <team2>VALLADOLID</team2>
                <goals1>2</goals1>
                <goals2>1</goals2>
                <result>1</result>
            </match>
            <match>
                <team1>MALLORCA</team1>
                <team2>BETIS</team2>
                <goals1>1</goals1>
                <goals2>0</goals2>
                <result>1</result>
            </match>
            <match>
                <team1>ZARAGOZA</team1>
                <team2>ATHLETIC CLUB</team2>
                <goals1>1</goals1>
                <goals2>2</goals2>
                <result>2</result>
            </match>
            <match>
                <team1>LEVANTE</team1>
                <team2>RAYO VALLECANO</team2>
                <goals1>2</goals1>
                <goals2>3</goals2>
                <result>2</result>
            </match>
            <match>
                <team1>CÓRDOBA</team1>
                <team2>HUESCA</team2>
                <goals1>2</goals1>
                <goals2>2</goals2>
                <result>X</result>
            </match>
            <match>
                <team1>LAS PALMAS</team1>
                <team2>RECREATIVO</team2>
                <goals1>0</goals1>
                <goals2>0</goals2>
                <result>X</result>
            </match>
            <match>
                <team1>HÉRCULES</team1>
                <team2>MIRANDÉS</team2>
                <goals1>1</goals1>
                <goals2>0</goals2>
                <result>1</result>
            </match>
            <match>
                <team1>PONFERRADINA</team1>
                <team2>NUMANCIA</team2>
                <goals1>1</goals1>
                <goals2>1</goals2>
                <result>X</result>
            </match>
            <match>
                <team1>SABADELL</team1>
                <team2>RACING</team2>
                <goals1>0</goals1>
                <goals2>2</goals2>
                <result>2</result>
            </match>
            <match>
                <team1>ALMERÍA</team1>
                <team2>ELCHE</team2>
                <goals1>2</goals1>
                <goals2>1</goals2>
                <result>1</result>
            </match>
            <match>
                <team1>VILLARREAL</team1>
                <team2>GIRONA</team2>
                <goals1>4</goals1>
                <goals2>1</goals2>
                <result>1</result>
            </match>
            <match>
                <team1>DEPORTIVO</team1>
                <team2>ESPANYOL</team2>
                <goals1>2</goals1>
                <goals2>0</goals2>
                <result>1</result>
            </match>
        </matchs>
    </result>
</results>
```
### CSV format example:
```csv
http://localhost/quiniela?start=2013-05-01&end=2013-05-15
wday,date,played,team1,team2,goals1,goals2,result
47,2013-05-12T00:00:00.000Z,true,RAYO VALLECANO,VALENCIA,0,4,2
47,2013-05-12T00:00:00.000Z,true,OSASUNA,GETAFE,1,0,1
47,2013-05-12T00:00:00.000Z,true,R. SOCIEDAD,GRANADA,2,2,X
47,2013-05-12T00:00:00.000Z,true,ESPANYOL,R. MADRID,1,1,X
47,2013-05-12T00:00:00.000Z,true,VALLADOLID,DEPORTIVO,1,0,1
47,2013-05-12T00:00:00.000Z,true,AT. MADRID,BARCELONA,1,2,2
47,2013-05-12T00:00:00.000Z,true,BETIS,CELTA,1,0,1
47,2013-05-12T00:00:00.000Z,true,ATHLETIC CLUB,MALLORCA,2,1,1
47,2013-05-12T00:00:00.000Z,true,SPORTING,CÓRDOBA,3,0,1
47,2013-05-12T00:00:00.000Z,true,MIRANDÉS,PONFERRADINA,0,0,X
47,2013-05-12T00:00:00.000Z,true,MURCIA,SABADELL,1,1,X
47,2013-05-12T00:00:00.000Z,true,LUGO,ALMERÍA,3,5,2
47,2013-05-12T00:00:00.000Z,true,ALCORCÓN,VILLARREAL,1,3,2
47,2013-05-12T00:00:00.000Z,true,GIRONA,XEREZ,2,4,2
47,2013-05-12T00:00:00.000Z,true,MÁLAGA,SEVILLA,0,0,X
46,2013-05-05T00:00:00.000Z,true,VALENCIA,OSASUNA,4,0,1
46,2013-05-05T00:00:00.000Z,true,GETAFE,R. SOCIEDAD,2,1,1
46,2013-05-05T00:00:00.000Z,true,GRANADA,MÁLAGA,1,0,1
46,2013-05-05T00:00:00.000Z,true,SEVILLA,ESPANYOL,3,0,1
46,2013-05-05T00:00:00.000Z,true,R. MADRID,VALLADOLID,4,3,1
46,2013-05-05T00:00:00.000Z,true,BARCELONA,BETIS,4,2,1
46,2013-05-05T00:00:00.000Z,true,MALLORCA,LEVANTE,1,1,X
46,2013-05-05T00:00:00.000Z,true,ZARAGOZA,RAYO VALLECANO,3,0,1
46,2013-05-05T00:00:00.000Z,true,LAS PALMAS,SPORTING,4,2,1
46,2013-05-05T00:00:00.000Z,true,HÉRCULES,HUESCA,2,1,1
46,2013-05-05T00:00:00.000Z,true,GUADALAJARA,MIRANDÉS,1,1,X
46,2013-05-05T00:00:00.000Z,true,ALMERÍA,RACING,2,1,1
46,2013-05-05T00:00:00.000Z,true,VILLARREAL,ELCHE,2,3,2
46,2013-05-05T00:00:00.000Z,true,GIRONA,ALCORCÓN,3,2,1
46,2013-05-05T00:00:00.000Z,true,DEPORTIVO,AT. MADRID,0,0,X
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
  {"results":[{
     "wday":"48",
     "date":"2013-05-19T00:00:00.000Z",
     "played":true,
     "matchs":[{"team1":"GETAFE","team2":"VALENCIA","goals1":"0","goals2":"1","result":"2"},
               {"team1":"GRANADA","team2":"OSASUNA","goals1":"3","goals2":"0","result":"1"},
               {"team1":"SEVILLA","team2":"R. SOCIEDAD","goals1":"1","goals2":"2","result":"2"},
               {"team1":"BARCELONA","team2":"VALLADOLID","goals1":"2","goals2":"1","result":"1"},
               {"team1":"MALLORCA","team2":"BETIS","goals1":"1","goals2":"0","result":"1"},
               {"team1":"ZARAGOZA","team2":"ATHLETIC CLUB","goals1":"1","goals2":"2","result":"2"},
               {"team1":"LEVANTE","team2":"RAYO VALLECANO","goals1":"2","goals2":"3","result":"2"},
               {"team1":"CÓRDOBA","team2":"HUESCA","goals1":"2","goals2":"2","result":"X"},
               {"team1":"LAS PALMAS","team2":"RECREATIVO","goals1":"0","goals2":"0","result":"X"},
               {"team1":"HÉRCULES","team2":"MIRANDÉS","goals1":"1","goals2":"0","result":"1"},
               {"team1":"PONFERRADINA","team2":"NUMANCIA","goals1":"1","goals2":"1","result":"X"},
               {"team1":"SABADELL","team2":"RACING","goals1":"0","goals2":"2","result":"2"},
               {"team1":"ALMERÍA","team2":"ELCHE","goals1":"2","goals2":"1","result":"1"},
               {"team1":"VILLARREAL","team2":"GIRONA","goals1":"4","goals2":"1","result":"1"},
               {"team1":"DEPORTIVO","team2":"ESPANYOL","goals1":"2","goals2":"0","result":"1"}]
               }]
  } 
```

### Apuesta para una determinada fecha
```html
  http://localhost/primitiva/2013-05-16
  {"results":[{
     "date":"2013-05-16T00:00:00.000Z",
     "combination":["12","18","24","28","38","48"],
     "complementary":"32",
     "refund":"3"}]
  }
```
### Apuestas por rango de fechas
```html
  http://localhost/quiniela?start=2013-05-01&end=2013-05-15
  {"results":[{
     "wday":"47",
     "date":"2013-05-12T00:00:00.000Z",
     "played":true,
     "matchs":[{"team1":"RAYO VALLECANO","team2":"VALENCIA","goals1":"0","goals2":"4","result":"2"},
               {"team1":"OSASUNA","team2":"GETAFE","goals1":"1","goals2":"0","result":"1"},
               {"team1":"R. SOCIEDAD","team2":"GRANADA","goals1":"2","goals2":"2","result":"X"},
               {"team1":"ESPANYOL","team2":"R. MADRID","goals1":"1","goals2":"1","result":"X"},
               {"team1":"VALLADOLID","team2":"DEPORTIVO","goals1":"1","goals2":"0","result":"1"},
               {"team1":"AT. MADRID","team2":"BARCELONA","goals1":"1","goals2":"2","result":"2"},
               {"team1":"BETIS","team2":"CELTA","goals1":"1","goals2":"0","result":"1"},
               {"team1":"ATHLETIC CLUB","team2":"MALLORCA","goals1":"2","goals2":"1","result":"1"},
               {"team1":"SPORTING","team2":"CÓRDOBA","goals1":"3","goals2":"0","result":"1"},
               {"team1":"MIRANDÉS","team2":"PONFERRADINA","goals1":"0","goals2":"0","result":"X"},
               {"team1":"MURCIA","team2":"SABADELL","goals1":"1","goals2":"1","result":"X"},
               {"team1":"LUGO","team2":"ALMERÍA","goals1":"3","goals2":"5","result":"2"},
               {"team1":"ALCORCÓN","team2":"VILLARREAL","goals1":"1","goals2":"3","result":"2"},
               {"team1":"GIRONA","team2":"XEREZ","goals1":"2","goals2":"4","result":"2"},
               {"team1":"MÁLAGA","team2":"SEVILLA","goals1":"0","goals2":"0","result":"X"}]
    },{
      "wday":"46",
      "date":"2013-05-05T00:00:00.000Z",
      "played":true,
      "matchs":[{"team1":"VALENCIA","team2":"OSASUNA","goals1":"4","goals2":"0","result":"1"},
                {"team1":"GETAFE","team2":"R. SOCIEDAD","goals1":"2","goals2":"1","result":"1"},
                {"team1":"GRANADA","team2":"MÁLAGA","goals1":"1","goals2":"0","result":"1"},
                {"team1":"SEVILLA","team2":"ESPANYOL","goals1":"3","goals2":"0","result":"1"},
                {"team1":"R. MADRID","team2":"VALLADOLID","goals1":"4","goals2":"3","result":"1"},
                {"team1":"BARCELONA","team2":"BETIS","goals1":"4","goals2":"2","result":"1"},
                {"team1":"MALLORCA","team2":"LEVANTE","goals1":"1","goals2":"1","result":"X"},
                {"team1":"ZARAGOZA","team2":"RAYO VALLECANO","goals1":"3","goals2":"0","result":"1"},
                {"team1":"LAS PALMAS","team2":"SPORTING","goals1":"4","goals2":"2","result":"1"},
                {"team1":"HÉRCULES","team2":"HUESCA","goals1":"2","goals2":"1","result":"1"},
                {"team1":"GUADALAJARA","team2":"MIRANDÉS","goals1":"1","goals2":"1","result":"X"},
                {"team1":"ALMERÍA","team2":"RACING","goals1":"2","goals2":"1","result":"1"},
                {"team1":"VILLARREAL","team2":"ELCHE","goals1":"2","goals2":"3","result":"2"},
                {"team1":"GIRONA","team2":"ALCORCÓN","goals1":"3","goals2":"2","result":"1"},
                {"team1":"DEPORTIVO","team2":"AT. MADRID","goals1":"0","goals2":"0","result":"X"}]
        }]
   }
``` 

Otros formatos de respuesta
---------------------

Por defecto el formato de respuesta del servicio REST es JSON pero también estan disponibles los 
formatos XML y CSV.

### Formatos soportados (cabecera petición HTTP)

- JSON: `content-type=json` o `content-type=text/html`
- XML: `content-type=application/xml`
- CSV: `content-type=application/vnd.ms-excel` o `content-type=application/csv`

### Ejemplo formato XML

```xml
http://localhost/quiniela
<?xml version="1.0" encoding="UTF-8"?>
<results>
    <result>
        <wday>48</wday>
        <date>2013-05-19T00:00:00.000Z</date>
        <played>true</played>
        <matchs>
            <match>
                <team1>GETAFE</team1>
                <team2>VALENCIA</team2>
                <goals1>0</goals1>
                <goals2>1</goals2>
                <result>2</result>
            </match>
            <match>
                <team1>GRANADA</team1>
                <team2>OSASUNA</team2>
                <goals1>3</goals1>
                <goals2>0</goals2>
                <result>1</result>
            </match>
            <match>
                <team1>SEVILLA</team1>
                <team2>R. SOCIEDAD</team2>
                <goals1>1</goals1>
                <goals2>2</goals2>
                <result>2</result>
            </match>
            <match>
                <team1>BARCELONA</team1>
                <team2>VALLADOLID</team2>
                <goals1>2</goals1>
                <goals2>1</goals2>
                <result>1</result>
            </match>
            <match>
                <team1>MALLORCA</team1>
                <team2>BETIS</team2>
                <goals1>1</goals1>
                <goals2>0</goals2>
                <result>1</result>
            </match>
            <match>
                <team1>ZARAGOZA</team1>
                <team2>ATHLETIC CLUB</team2>
                <goals1>1</goals1>
                <goals2>2</goals2>
                <result>2</result>
            </match>
            <match>
                <team1>LEVANTE</team1>
                <team2>RAYO VALLECANO</team2>
                <goals1>2</goals1>
                <goals2>3</goals2>
                <result>2</result>
            </match>
            <match>
                <team1>CÓRDOBA</team1>
                <team2>HUESCA</team2>
                <goals1>2</goals1>
                <goals2>2</goals2>
                <result>X</result>
            </match>
            <match>
                <team1>LAS PALMAS</team1>
                <team2>RECREATIVO</team2>
                <goals1>0</goals1>
                <goals2>0</goals2>
                <result>X</result>
            </match>
            <match>
                <team1>HÉRCULES</team1>
                <team2>MIRANDÉS</team2>
                <goals1>1</goals1>
                <goals2>0</goals2>
                <result>1</result>
            </match>
            <match>
                <team1>PONFERRADINA</team1>
                <team2>NUMANCIA</team2>
                <goals1>1</goals1>
                <goals2>1</goals2>
                <result>X</result>
            </match>
            <match>
                <team1>SABADELL</team1>
                <team2>RACING</team2>
                <goals1>0</goals1>
                <goals2>2</goals2>
                <result>2</result>
            </match>
            <match>
                <team1>ALMERÍA</team1>
                <team2>ELCHE</team2>
                <goals1>2</goals1>
                <goals2>1</goals2>
                <result>1</result>
            </match>
            <match>
                <team1>VILLARREAL</team1>
                <team2>GIRONA</team2>
                <goals1>4</goals1>
                <goals2>1</goals2>
                <result>1</result>
            </match>
            <match>
                <team1>DEPORTIVO</team1>
                <team2>ESPANYOL</team2>
                <goals1>2</goals1>
                <goals2>0</goals2>
                <result>1</result>
            </match>
        </matchs>
    </result>
</results>
```
### Ejemplo formato CSV
```csv
http://localhost/quiniela?start=2013-05-01&end=2013-05-15
wday,date,played,team1,team2,goals1,goals2,result
47,2013-05-12T00:00:00.000Z,true,RAYO VALLECANO,VALENCIA,0,4,2
47,2013-05-12T00:00:00.000Z,true,OSASUNA,GETAFE,1,0,1
47,2013-05-12T00:00:00.000Z,true,R. SOCIEDAD,GRANADA,2,2,X
47,2013-05-12T00:00:00.000Z,true,ESPANYOL,R. MADRID,1,1,X
47,2013-05-12T00:00:00.000Z,true,VALLADOLID,DEPORTIVO,1,0,1
47,2013-05-12T00:00:00.000Z,true,AT. MADRID,BARCELONA,1,2,2
47,2013-05-12T00:00:00.000Z,true,BETIS,CELTA,1,0,1
47,2013-05-12T00:00:00.000Z,true,ATHLETIC CLUB,MALLORCA,2,1,1
47,2013-05-12T00:00:00.000Z,true,SPORTING,CÓRDOBA,3,0,1
47,2013-05-12T00:00:00.000Z,true,MIRANDÉS,PONFERRADINA,0,0,X
47,2013-05-12T00:00:00.000Z,true,MURCIA,SABADELL,1,1,X
47,2013-05-12T00:00:00.000Z,true,LUGO,ALMERÍA,3,5,2
47,2013-05-12T00:00:00.000Z,true,ALCORCÓN,VILLARREAL,1,3,2
47,2013-05-12T00:00:00.000Z,true,GIRONA,XEREZ,2,4,2
47,2013-05-12T00:00:00.000Z,true,MÁLAGA,SEVILLA,0,0,X
46,2013-05-05T00:00:00.000Z,true,VALENCIA,OSASUNA,4,0,1
46,2013-05-05T00:00:00.000Z,true,GETAFE,R. SOCIEDAD,2,1,1
46,2013-05-05T00:00:00.000Z,true,GRANADA,MÁLAGA,1,0,1
46,2013-05-05T00:00:00.000Z,true,SEVILLA,ESPANYOL,3,0,1
46,2013-05-05T00:00:00.000Z,true,R. MADRID,VALLADOLID,4,3,1
46,2013-05-05T00:00:00.000Z,true,BARCELONA,BETIS,4,2,1
46,2013-05-05T00:00:00.000Z,true,MALLORCA,LEVANTE,1,1,X
46,2013-05-05T00:00:00.000Z,true,ZARAGOZA,RAYO VALLECANO,3,0,1
46,2013-05-05T00:00:00.000Z,true,LAS PALMAS,SPORTING,4,2,1
46,2013-05-05T00:00:00.000Z,true,HÉRCULES,HUESCA,2,1,1
46,2013-05-05T00:00:00.000Z,true,GUADALAJARA,MIRANDÉS,1,1,X
46,2013-05-05T00:00:00.000Z,true,ALMERÍA,RACING,2,1,1
46,2013-05-05T00:00:00.000Z,true,VILLARREAL,ELCHE,2,3,2
46,2013-05-05T00:00:00.000Z,true,GIRONA,ALCORCÓN,3,2,1
46,2013-05-05T00:00:00.000Z,true,DEPORTIVO,AT. MADRID,0,0,X
```
