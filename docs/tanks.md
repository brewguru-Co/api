# Tank
발효 탱크(tank)에 대한 정보를 생성, 조회, 수정, 삭제하는 API

## Tea object
| name | type | description |
| --- | --- | --- |
| id | number | tank identifier |
| name | string | tank name |
| tea | string | tea name |
| tempHigh | number | max limit value of temperature |
| tempLow | number | min limit value of temperature |
| phHigh | number | max limit value of PH |
| phLow | number | min limit value of PH |
| doHigh | number | max limit value of DO |
| doLow | number | min limit value of DO |
| brixHigh | number | max limit value of Brix |
| brixLow | number | min limit value of Brix |

## Create a Tea
Create a tank

### Route
`POST /tanks`

### Body Parameters
| name | type | description |
| --- | --- | --- |
| name | string | (**required**) tank name |
| tea | string | (**required**) tea name that already has been registered |
| tempHigh | number | max limit value of temperature |
| tempLow | number | min limit value of temperature |
| phHigh | number | max limit value of PH |
| phLow | number | min limit value of PH |
| doHigh | number | max limit value of DO |
| doLow | number | min limit value of DO |
| brixHigh | number | max limit value of Brix |
| brixLow | number | min limit value of Brix |

### Request Example
```sh
curl -X POST
    -H "accept-version: 2.0.0"
    -H "Content-Type: application/json"
    -d '{
      "name": "1"
      "tea": "kombucha",
      "tempHigh": 30,
      "tempLow": 29.5,
      "phHigh": 3.5,
      "phLow": 3,
      "doHigh": 80,
      "doLow": 78,
    }'
     "http://{end-point}/tanks"
```

### Response
Created tank object on success, or error on failure.

### Response Example
``` json
{
  "id": 1,
  "name": "1",
  "tea": "kombucha",
  "tempHigh": 30,
  "tempLow": 29.5,
  "phHigh": 3.5,
  "phLow": 3,
  "doHigh": 80,
  "doLow": 78,
  "brixHigh": null,
  "brixLow": null,
}
```

## Get tanks
Get tanks

### Route
`GET /tanks`

### Request Example
```sh
curl -X GET
     "http://{end-point}/tanks"
```

### Response
Retrieved result list of tanks on success, or error on failure.

### Response Example
``` json
[{
  "id": 1,
  "name": "1",
  "tea": "kombucha",
  "tempHigh": 30,
  "tempLow": 29.5,
  "phHigh": 3.5,
  "phLow": 3,
  "doHigh": 80,
  "doLow": 78,
  "brixHigh": null,
  "brixLow": null,
}]
```

## Update a Tea
Update a tank

### Route
`PATCH /tanks/:tankId`

### Path Variables
| name | type | description |
| --- | --- | --- |
| tankId | string | (**required**) tank identifier |

### Body Parameters
| name | type | description |
| --- | --- | --- |
| name | string | tank name |
| tea | string | tea name |
| tempHigh | number | max limit value of temperature |
| tempLow | number | min limit value of temperature |
| phHigh | number | max limit value of PH |
| phLow | number | min limit value of PH |
| doHigh | number | max limit value of DO |
| doLow | number | min limit value of DO |
| brixHigh | number | max limit value of Brix |
| brixLow | number | min limit value of Brix |

### Request Example
```sh
curl -X PATCH
    -H "accept-version: 2.0.0"
    -H "Content-Type: application/json"
    -d '{
      "name": "114234"
    }'
     "http://{end-point}/tanks/1"
```

### Response
Updated tank object on success, or error on failure.

### Response Example
``` json
{
  "id": 1,
  "name": "114234",
  "tea": "kombucha",
  "tempHigh": 30,
  "tempLow": 29.5,
  "phHigh": 3.5,
  "phLow": 3,
  "doHigh": 80,
  "doLow": 78,
  "brixHigh": null,
  "brixLow": null,
}
```

## Delete a Tea
Delete a tank

### Route
`DELETE /tanks/:tankId`

### Request Example
```sh
curl -X DELETE
     "http://{end-point}/tanks/1"
```

### Response
Deleted tank id on success, or error on failure.

### Response Example
``` json
{
  "id": 1
}
```