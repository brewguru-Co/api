# TankData
발효 탱크(tank)의 측정 데이터를 생성, 조회하는 API

## TankData object
| name | type | description |
| --- | --- | --- |
| name | string | tank name |
| temp | number | temperature |
| ph | number | PH |
| doxy | number | dissolved oxygen |
| brix | number | brix |

## Create a TankData
Create a tankData

### Route
`POST /tankDatas`

### Body Parameters
| name | type | description |
| --- | --- | --- |
| name | string | (**required**) tank name |
| temp | number | (**required**) temperature |
| ph | number | (**required**) PH |
| doxy | number | (**required**) dissolved oxygen |
| brix | number | (**required**) brix |

### Request Example
```sh
curl -X POST
    -H "accept-version: 2.0.0"
    -H "Content-Type: application/json"
    -d '{
      "name": "tank1",
      "temp": 28,
      "ph": 3.5,
      "doxy": 45,
      "brix": 50
    }'
     "http://{end-point}/tankDatas"
```

### Response
Created tank object on success, or error on failure.

### Response Example
``` json
{
  "name": "tank1",
  "temp": 28,
  "ph": 3.5,
  "doxy": 45,
  "brix": 47,
  "createdAt": 1594109640
}
```

## Get tankDatas
Get tankDatas

### Route
`GET /tankDatas`

### Request Example
```sh
curl -X GET
     "http://{end-point}/tankDatas"
```

### Response
Retrieved result list of tanks on success, or error on failure.

### Response Example
``` json
[{
  "name": "tank1",
  "temp": 28,
  "ph": 3.5,
  "doxy": 45,
  "brix": 47,
  "createdAt": 1594109640
}]
```
