# METEOSAPI SERVER

Simple Aemet REST Server 


## Getting started


### Install dependences

    yarn install

### Get an API key
Go to the [Aemet OpenData Website](https://opendata.aemet.es/centrodedescargas/altaUsuario?) and follow the instructions to get an API key.

### Crate a .env file
Since the Aemet doesn´t provide a valid ssl cerfificate nodejs will reject all the requests, to prevent this use `NODE_TLS_REJECT_UNAUTHORIZED=0`.

The env file also will set the **api-key** used in the unit tests.

    NODE_TLS_REJECT_UNAUTHORIZED=0
    METEOSAPI_KEY="<your-api-key>"


## Usage

### GET /api/v1/:id

Ask for the weather forecast in a given province, the province code can be obtained from [here](http://www.ine.es/jaxi/menu.do?type=pcaxis&path=/t20/e245/codmun&file=inebase)
or from [here](https://iagolast.github.io/pselect/)

This method returns a `.json` with the weather forecast. 

#### Example Response

`getForecast` returns a data object with the following fields:

- `name`: Name of the municipe of the predicion
- `province`: Names of the required province.
- `today`: Simplified forecast for the current day
- `tomorrow`: Simplified forecast for the next today
- `next2`: Simplified forecast for the day after tomorrow
- `forecast`: array with the raw forecast values from the Aemet API


A `simplified forecast` has the following fields:

- `value`: The wheater forecast value.
- `description`: User readable weather forecast description.
- `tmp`: The temperature values for the day
    - `min`: The expected min temperature 
    - `max`: The expected max temperature 
    

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



#### Example response:

```javascript
{
  "name": "Pontevedra",
  "province": "Pontevedra",
  "today": {
    "value": "13",
    "descripcion": "Intervalos nubosos",
    "tmp": {
      "min": 5,
      "max": 15
    }
  },
  "tomorrow": {
    "value": "23",
    "descripcion": "Intervalos nubosos con lluvia",
    "tmp": {
      "min": 7,
      "max": 13
    }
  },
  "next2": {
    "value": "26",
    "descripcion": "Cubierto con lluvia",
    "tmp": {
      "min": 8,
      "max": 12
    }
  },
  "forecast": [
    {
      "probPrecipitacion": [
        {
          "value": 25,
          "periodo": "00-24"
        },
        {
          "value": 10,
          "periodo": "00-12"
        },
        {
          "value": 5,
          "periodo": "12-24"
        },
        {
          "value": 10,
          "periodo": "00-06"
        },
        {
          "value": 0,
          "periodo": "06-12"
        },
        {
          "value": 5,
          "periodo": "12-18"
        },
        {
          "value": 5,
          "periodo": "18-24"
        }
      ],
      "cotaNieveProv": [
        {
          "value": "1200",
          "periodo": "00-24"
        },
        {
          "value": "1200",
          "periodo": "00-12"
        },
        {
          "value": "",
          "periodo": "12-24"
        },
        {
          "value": "1200",
          "periodo": "00-06"
        },
        {
          "value": "",
          "periodo": "06-12"
        },
        {
          "value": "",
          "periodo": "12-18"
        },
        {
          "value": "",
          "periodo": "18-24"
        }
      ],
      "estadoCielo": [
        {
          "value": "13",
          "descripcion": "Intervalos nubosos",
          "tmp": {
            "min": 5,
            "max": 15
          }
        },
        {
          "value": "13",
          "periodo": "00-12",
          "descripcion": "Intervalos nubosos"
        },
        {
          "value": "13",
          "periodo": "12-24",
          "descripcion": "Intervalos nubosos"
        },
        {
          "value": "13n",
          "periodo": "00-06",
          "descripcion": "Intervalos nubosos"
        },
        {
          "value": "11",
          "periodo": "06-12",
          "descripcion": "Despejado"
        },
        {
          "value": "13",
          "periodo": "12-18",
          "descripcion": "Intervalos nubosos"
        },
        {
          "value": "12n",
          "periodo": "18-24",
          "descripcion": "Poco nuboso"
        }
      ],
      "viento": [
        {
          "direccion": "E",
          "velocidad": 15,
          "periodo": "00-24"
        },
        {
          "direccion": "E",
          "velocidad": 15,
          "periodo": "00-12"
        },
        {
          "direccion": "NE",
          "velocidad": 20,
          "periodo": "12-24"
        },
        {
          "direccion": "E",
          "velocidad": 15,
          "periodo": "00-06"
        },
        {
          "direccion": "E",
          "velocidad": 15,
          "periodo": "06-12"
        },
        {
          "direccion": "NE",
          "velocidad": 20,
          "periodo": "12-18"
        },
        {
          "direccion": "NE",
          "velocidad": 10,
          "periodo": "18-24"
        }
      ],
      "rachaMax": [
        {
          "value": "",
          "periodo": "00-24"
        },
        {
          "value": "",
          "periodo": "00-12"
        },
        {
          "value": "",
          "periodo": "12-24"
        },
        {
          "value": "",
          "periodo": "00-06"
        },
        {
          "value": "",
          "periodo": "06-12"
        },
        {
          "value": "",
          "periodo": "12-18"
        },
        {
          "value": "",
          "periodo": "18-24"
        }
      ],
      "temperatura": {
        "maxima": 15,
        "minima": 5,
        "dato": [
          {
            "value": 5,
            "hora": 6
          },
          {
            "value": 13,
            "hora": 12
          },
          {
            "value": 12,
            "hora": 18
          },
          {
            "value": 8,
            "hora": 24
          }
        ]
      },
      "sensTermica": {
        "maxima": 15,
        "minima": 2,
        "dato": [
          {
            "value": 3,
            "hora": 6
          },
          {
            "value": 13,
            "hora": 12
          },
          {
            "value": 12,
            "hora": 18
          },
          {
            "value": 6,
            "hora": 24
          }
        ]
      },
      "humedadRelativa": {
        "maxima": 65,
        "minima": 40,
        "dato": [
          {
            "value": 60,
            "hora": 6
          },
          {
            "value": 40,
            "hora": 12
          },
          {
            "value": 55,
            "hora": 18
          },
          {
            "value": 65,
            "hora": 24
          }
        ]
      },
      "uvMax": 1,
      "fecha": "2017-02-11"
    },
    {
      "probPrecipitacion": [
        {
          "value": 100,
          "periodo": "00-24"
        },
        {
          "value": 70,
          "periodo": "00-12"
        },
        {
          "value": 100,
          "periodo": "12-24"
        },
        {
          "value": 5,
          "periodo": "00-06"
        },
        {
          "value": 70,
          "periodo": "06-12"
        },
        {
          "value": 95,
          "periodo": "12-18"
        },
        {
          "value": 90,
          "periodo": "18-24"
        }
      ],
      "cotaNieveProv": [
        {
          "value": "",
          "periodo": "00-24"
        },
        {
          "value": "",
          "periodo": "00-12"
        },
        {
          "value": "",
          "periodo": "12-24"
        },
        {
          "value": "",
          "periodo": "00-06"
        },
        {
          "value": "",
          "periodo": "06-12"
        },
        {
          "value": "",
          "periodo": "12-18"
        },
        {
          "value": "",
          "periodo": "18-24"
        }
      ],
      "estadoCielo": [
        {
          "value": "23",
          "descripcion": "Intervalos nubosos con lluvia",
          "tmp": {
            "min": 7,
            "max": 13
          }
        },
        {
          "value": "23",
          "periodo": "00-12",
          "descripcion": "Intervalos nubosos con lluvia"
        },
        {
          "value": "25",
          "periodo": "12-24",
          "descripcion": "Muy nuboso con lluvia"
        },
        {
          "value": "13n",
          "periodo": "00-06",
          "descripcion": "Intervalos nubosos"
        },
        {
          "value": "43",
          "periodo": "06-12",
          "descripcion": "Intervalos nubosos con lluvia escasa"
        },
        {
          "value": "25",
          "periodo": "12-18",
          "descripcion": "Muy nuboso con lluvia"
        },
        {
          "value": "25n",
          "periodo": "18-24",
          "descripcion": "Muy nuboso con lluvia"
        }
      ],
      "viento": [
        {
          "direccion": "E",
          "velocidad": 15,
          "periodo": "00-24"
        },
        {
          "direccion": "E",
          "velocidad": 15,
          "periodo": "00-12"
        },
        {
          "direccion": "E",
          "velocidad": 15,
          "periodo": "12-24"
        },
        {
          "direccion": "NE",
          "velocidad": 10,
          "periodo": "00-06"
        },
        {
          "direccion": "E",
          "velocidad": 15,
          "periodo": "06-12"
        },
        {
          "direccion": "E",
          "velocidad": 10,
          "periodo": "12-18"
        },
        {
          "direccion": "SE",
          "velocidad": 10,
          "periodo": "18-24"
        }
      ],
      "rachaMax": [
        {
          "value": "",
          "periodo": "00-24"
        },
        {
          "value": "",
          "periodo": "00-12"
        },
        {
          "value": "",
          "periodo": "12-24"
        },
        {
          "value": "",
          "periodo": "00-06"
        },
        {
          "value": "",
          "periodo": "06-12"
        },
        {
          "value": "",
          "periodo": "12-18"
        },
        {
          "value": "",
          "periodo": "18-24"
        }
      ],
      "temperatura": {
        "maxima": 13,
        "minima": 7,
        "dato": [
          {
            "value": 7,
            "hora": 6
          },
          {
            "value": 10,
            "hora": 12
          },
          {
            "value": 12,
            "hora": 18
          },
          {
            "value": 12,
            "hora": 24
          }
        ]
      },
      "sensTermica": {
        "maxima": 13,
        "minima": 5,
        "dato": [
          {
            "value": 5,
            "hora": 6
          },
          {
            "value": 10,
            "hora": 12
          },
          {
            "value": 12,
            "hora": 18
          },
          {
            "value": 12,
            "hora": 24
          }
        ]
      },
      "humedadRelativa": {
        "maxima": 80,
        "minima": 55,
        "dato": [
          {
            "value": 65,
            "hora": 6
          },
          {
            "value": 60,
            "hora": 12
          },
          {
            "value": 70,
            "hora": 18
          },
          {
            "value": 70,
            "hora": 24
          }
        ]
      },
      "uvMax": 2,
      "fecha": "2017-02-12"
    },
    {
      "probPrecipitacion": [
        {
          "value": 100,
          "periodo": "00-24"
        },
        {
          "value": 100,
          "periodo": "00-12"
        },
        {
          "value": 100,
          "periodo": "12-24"
        }
      ],
      "cotaNieveProv": [
        {
          "value": "1100",
          "periodo": "00-24"
        },
        {
          "value": "1100",
          "periodo": "00-12"
        },
        {
          "value": "1000",
          "periodo": "12-24"
        }
      ],
      "estadoCielo": [
        {
          "value": "26",
          "descripcion": "Cubierto con lluvia",
          "tmp": {
            "min": 8,
            "max": 12
          }
        },
        {
          "value": "26",
          "periodo": "00-12",
          "descripcion": "Cubierto con lluvia"
        },
        {
          "value": "25",
          "periodo": "12-24",
          "descripcion": "Muy nuboso con lluvia"
        }
      ],
      "viento": [
        {
          "direccion": "S",
          "velocidad": 15,
          "periodo": "00-24"
        },
        {
          "direccion": "S",
          "velocidad": 15,
          "periodo": "00-12"
        },
        {
          "direccion": "S",
          "velocidad": 15,
          "periodo": "12-24"
        }
      ],
      "rachaMax": [
        {
          "value": "",
          "periodo": "00-24"
        },
        {
          "value": "",
          "periodo": "00-12"
        },
        {
          "value": "",
          "periodo": "12-24"
        }
      ],
      "temperatura": {
        "maxima": 12,
        "minima": 8,
        "dato": []
      },
      "sensTermica": {
        "maxima": 12,
        "minima": 7,
        "dato": []
      },
      "humedadRelativa": {
        "maxima": 90,
        "minima": 70,
        "dato": []
      },
      "uvMax": 1,
      "fecha": "2017-02-13"
    },
    {
      "probPrecipitacion": [
        {
          "value": 100,
          "periodo": "00-24"
        },
        {
          "value": 90,
          "periodo": "00-12"
        },
        {
          "value": 75,
          "periodo": "12-24"
        }
      ],
      "cotaNieveProv": [
        {
          "value": "1100",
          "periodo": "00-24"
        },
        {
          "value": "1100",
          "periodo": "00-12"
        },
        {
          "value": "",
          "periodo": "12-24"
        }
      ],
      "estadoCielo": [
        {
          "value": "24",
          "periodo": "00-24",
          "descripcion": "Nuboso con lluvia"
        },
        {
          "value": "24",
          "periodo": "00-12",
          "descripcion": "Nuboso con lluvia"
        },
        {
          "value": "25",
          "periodo": "12-24",
          "descripcion": "Muy nuboso con lluvia"
        }
      ],
      "viento": [
        {
          "direccion": "S",
          "velocidad": 20,
          "periodo": "00-24"
        },
        {
          "direccion": "S",
          "velocidad": 20,
          "periodo": "00-12"
        },
        {
          "direccion": "S",
          "velocidad": 20,
          "periodo": "12-24"
        }
      ],
      "rachaMax": [
        {
          "value": "",
          "periodo": "00-24"
        },
        {
          "value": "",
          "periodo": "00-12"
        },
        {
          "value": "",
          "periodo": "12-24"
        }
      ],
      "temperatura": {
        "maxima": 14,
        "minima": 7,
        "dato": []
      },
      "sensTermica": {
        "maxima": 14,
        "minima": 5,
        "dato": []
      },
      "humedadRelativa": {
        "maxima": 85,
        "minima": 60,
        "dato": []
      },
      "uvMax": 2,
      "fecha": "2017-02-14"
    },
    {
      "probPrecipitacion": [
        {
          "value": 60
        }
      ],
      "cotaNieveProv": [
        {
          "value": ""
        }
      ],
      "estadoCielo": [
        {
          "value": "25",
          "descripcion": "Muy nuboso con lluvia"
        }
      ],
      "viento": [
        {
          "direccion": "SE",
          "velocidad": 10
        }
      ],
      "rachaMax": [
        {
          "value": ""
        }
      ],
      "temperatura": {
        "maxima": 17,
        "minima": 8,
        "dato": []
      },
      "sensTermica": {
        "maxima": 17,
        "minima": 8,
        "dato": []
      },
      "humedadRelativa": {
        "maxima": 65,
        "minima": 50,
        "dato": []
      },
      "uvMax": 2,
      "fecha": "2017-02-15"
    },
    {
      "probPrecipitacion": [
        {
          "value": 40
        }
      ],
      "cotaNieveProv": [
        {
          "value": ""
        }
      ],
      "estadoCielo": [
        {
          "value": "13",
          "descripcion": "Intervalos nubosos"
        }
      ],
      "viento": [
        {
          "direccion": "C",
          "velocidad": 0
        }
      ],
      "rachaMax": [
        {
          "value": ""
        }
      ],
      "temperatura": {
        "maxima": 18,
        "minima": 6,
        "dato": []
      },
      "sensTermica": {
        "maxima": 18,
        "minima": 6,
        "dato": []
      },
      "humedadRelativa": {
        "maxima": 70,
        "minima": 55,
        "dato": []
      },
      "fecha": "2017-02-16"
    },
    {
      "probPrecipitacion": [
        {
          "value": 55
        }
      ],
      "cotaNieveProv": [
        {
          "value": ""
        }
      ],
      "estadoCielo": [
        {
          "value": "43",
          "descripcion": "Intervalos nubosos con lluvia escasa"
        }
      ],
      "viento": [
        {
          "direccion": "C",
          "velocidad": 0
        }
      ],
      "rachaMax": [
        {
          "value": ""
        }
      ],
      "temperatura": {
        "maxima": 18,
        "minima": 7,
        "dato": []
      },
      "sensTermica": {
        "maxima": 18,
        "minima": 7,
        "dato": []
      },
      "humedadRelativa": {
        "maxima": 75,
        "minima": 60,
        "dato": []
      },
      "fecha": "2017-02-17"
    }
  ]
}
````