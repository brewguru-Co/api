# Batch
발효 사이클(batch)에 대한 정보를 생성, 조회, 수정, 삭제하는 API

## Batch object
| name | type | description |
| --- | --- | --- |
| id | number | batch identifier |
| teaId | number | tea identifier |
| tankId | number | tank identifier |
| teaName | string | tea name |
| tankName | string | tank name |
| temp | number | product's temperature |
| ph | number | product's PH value |
| dox | number | product's DO value |
| brix | number | product's Brix value |
| startedAt | number | batch start time |
| finishedAt | number | batch finish time  |
| hasError | boolean | has any error during fermentation (default: `false`) |

## Create a Batch
Create a batch

### Route
`POST /batchs`

### Body Parameters
| name | type | description |
| --- | --- | --- |
| teaId | number | (**required**) tea identifier |
| tankId | number | (**required**) tankId identifier |
| startedAt | number | (**required**) batch start time (millisecond) |
| temp | number | product's temperature |
| ph | number | product's PH value |
| dox | number | product's DO value |
| brix | number | product's Brix value |
| finishedAt | number | batch finish time (millisecond) |
| hasError | boolean | has any error during fermentation |

### Request Example
```sh
curl -X POST
    -H "accept-version: 2.0.0"
    -H "Content-Type: application/json"
    -d '{
      "teaId": 1,
      "tankId": 1,
      "startedAt": 1593932595,
    }'
     "http://{end-point}/batchs"
```

### Response
Created batch object on success, or error on failure.

### Response Example
``` json
{
  "id": 1,
  "teaId": 1,
  "tankId": 1,
  "teaName": "kombucha",
  "tankName": "tank1",
  "temp": null,
  "ph": null,
  "dox": null,
  "brix": null,
  "hasError": false,
  "startedAt": 1593932595,
  "finishedAt": null
}
```

## Get batchs
Get batchs

### Route
`GET /batchs`

### Request Example
```sh
curl -X GET
     "http://{end-point}/batchs"
```

### Response
Retrieved result list of batchs on success, or error on failure.

### Response Example
``` json
[{
  "id": 1,
  "teaId": 1,
  "tankId": 1,
  "teaName": "kombucha",
  "tankName": "tank1",
  "temp": null,
  "ph": null,
  "dox": null,
  "brix": null,
  "hasError": false,
  "startedAt": 1593932595,
  "finishedAt": null
}]
```

## Update a Batch
Update a batch

### Route
`PATCH /batchs/:batchId`

### Path Variables
| name | type | description |
| --- | --- | --- |
| batchId | string | (**required**) batch identifier |

### Body Parameters
| name | type | description |
| --- | --- | --- |
| teaId | number | tea identifier |
| tankId | number | tankId identifier |
| temp | number | product's temperature |
| ph | number | product's PH value |
| dox | number | product's DO value |
| brix | number | product's Brix value |
| startedAt | number | batch start time (millisecond) |
| finishedAt | number | batch finish time (millisecond) |
| hasError | boolean | has any error during fermentation |

### Request Example
```sh
curl -X PATCH
    -H "accept-version: 2.0.0"
    -H "Content-Type: application/json"
    -d '{
      "ph": 2.51,
      "dox": 70,
      "temp": 24.2,
      "brix": 0.2,
    }'
     "http://{end-point}/batchs/1"
```

### Response
Updated batch object on success, or error on failure.

### Response Example
``` json
{
  "id": 1,
  "teaId": 1,
  "tankId": 1,
  "teaName": "kombucha",
  "tankName": "tank1",
  "temp": 24.2,
  "ph": 2.51,
  "dox": 70,
  "brix": 0.2,
  "hasError": false,
  "startedAt": 1593932595,
  "finishedAt": null
}
```

## Delete a Batch
Delete a batch

### Route
`DELETE /batchs`

### Body Parameters
| name | type | description |
| --- | --- | --- |
| id | number | batch identifier |

### Request Example
```sh
curl -X DELETE
    -H "accept-version: 2.0.0"
    -H "Content-Type: application/json"
    -d '{
        "id": 1
      }'
     "http://{end-point}/batchs"
```

### Response
Deleted batch id on success, or error on failure.

### Response Example
``` json
{
  "id": 1
}
```