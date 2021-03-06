# METEOSAPI SERVER

Simple Aemet REST Server 


## Getting started

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)


### Install dependences

    yarn install

Notice that this server can use both [meteosapi](https://github.com/IagoLast/meteosapi) or [meteoscrapi](https://github.com/IagoLast/meteoscrapi) as weather backend.

If you use meteosapi you will require the API key.

### Get an API key
Go to the [Aemet OpenData Website](https://opendata.aemet.es/centrodedescargas/altaUsuario?) and follow the instructions to get an API key.


### Crate a .env file
Since the Aemet doesn´t provide a valid ssl cerfificate nodejs will reject all the requests, to prevent this use `NODE_TLS_REJECT_UNAUTHORIZED=0`.

The env file also will set the **api-key**.

    NODE_TLS_REJECT_UNAUTHORIZED=0
    METEOSAPI_KEY="<your-api-key>"


## Usage

### GET /api/v1/simple/:id

Ask for the simplified weather forecast in a given province for the next 3 days. The province code can be obtained from [here](http://www.ine.es/jaxi/menu.do?type=pcaxis&path=/t20/e245/codmun&file=inebase)
or from [here](https://iagolast.github.io/pselect/)

This method returns a `.json` with following fields.

- `name`: Name of the municipe of the predicion
- `province`: Names of the required province.
- `today`: Simplified forecast for the current day
- `tomorrow`: Simplified forecast for the next today
- `next2`: Simplified forecast for the day after tomorrow


A `simplified forecast` has the following fields:

- `value`: The wheater forecast value.
- `description`: User readable weather forecast description.
- `tmp`: The temperature values for the day
    - `min`: The expected min temperature 
    - `max`: The expected max temperature 

#### Example Response


```javascript
{
  "name": "Pontevedra",
  "province": "Pontevedra",
  "today": {
    "value": "25",
    "descripcion": "Muy nuboso con lluvia",
    "tmp": {
      "min": 6,
      "max": 14
    }
  },
  "tomorrow": {
    "value": "24",
    "descripcion": "Nuboso con lluvia",
    "tmp": {
      "min": 9,
      "max": 12
    }
  },
  "next2": {
    "value": "25",
    "descripcion": "Muy nuboso con lluvia",
    "tmp": {
      "min": 9,
      "max": 13
    }
  }
}
```
  
### GET /api/v1/forecast/:id
This method returns a `.json` with same fields as the `simple` endpoint but adds a **forecast** field containing the raw data 
from the Aemet.

- `name`: Name of the municipe of the predicion
- `province`: Names of the required province.
- `today`: Simplified forecast for the current day
- `tomorrow`: Simplified forecast for the next today
- `next2`: Simplified forecast for the day after tomorrow
- `forecast`: Raw forecast data from the Aemet. 


#### List of meteo values and the meanings
The value field in the simplified forecast can be one of the following, the `n` after the code comes from `night`.


    11 – Despejado
    11n – Despejado noche 12 Poco nuboso
    12n – Poco nuboso noche
    13 – Intervalos nubosos
    13n – Intervalos nubosos noche
    14 – Nuboso
    14n – Nuboso noche
    15 – Muy nuboso
    16n – Muy nuboso
    16 – Cubierto
    16n – Cubierto
    17 – Nubes altas
    17n – Nubes altas noche
    23 – Intervalos nubosos con lluvia
    23n – Intervalos nubosos con lluvia noche
    24 – Nuboso con lluvia
    24n – Nuboso con lluvia noche
    25 – Muy nuboso con lluvia
    25n – Muy nuboso con lluvia
    26 – Cubierto con lluvia
    26n – Cubierto con lluvia
    33 – Intervalos nubosos con nieve
    33n – Intervalos nubosos con nieve noche
    34 – Nuboso con nieve
    34n – Nuboso con nieve noche
    35 – Muy nuboso con nieve
    35n – Muy nuboso con nieve
    36 – Cubierto con nieve
    36n – Cubierto con nieve
    43 – Intervalos nubosos con lluvia escasa
    43n – Intervalos nubosos con lluvia escasa noche
    44 – Nuboso con lluvia escasa
    44n – Nuboso con lluvia escasa noche
    45n – Muy nuboso con lluvia escasa
    46n – Cubierto con lluvia escasa
    51 – Intervalos nubosos con tormenta
    51n – Intervalos nubosos con tormenta noche
    52 – Nuboso con tormenta
    52n – Nuboso con tormenta noche
    53 – Muy nuboso con tormenta
    53n – Muy nuboso con tormenta
    54 – Cubierto con tormenta
    54n – Cubierto con tormenta
    61 – Intervalos nubosos con tormenta y lluvia escasa
    61n – Intervalos nubosos con tormenta y lluvia escasa noche 
    62 Nuboso con tormenta y lluvia escasa
    62n – Nuboso con tormenta y lluvia escasa noche
    63 – Muy nuboso con tormenta y lluvia escasa
    63n – Muy nuboso con tormenta y lluvia escasa 
    64 Cubierto con tormenta y lluvia escasa 
    64n Cubierto con tormenta y lluvia escasa
    71 – Intervalos nubosos con nieve escasa
    71n – Intervalos nubosos con nieve escasa noche 
    72 Nuboso con nieve escasa
    72n – Nuboso con nieve escasa noche
    73 – Muy nuboso con nieve escasa
    73n – Muy nuboso con nieve escasa 
    74 Cubierto con nieve escasa
    74n Cubierto con nieve escasa