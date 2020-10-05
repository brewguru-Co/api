# TeaOffset
알고리즘에서 사용할 offset에 대한 정보를 생성, 조회, 수정, 삭제하는 API

## TeaOffset object
| name | type | description |
| --- | --- | --- |
| id | number | teaOffset identifier |
| teaId | string | tea identifier |
| teaName | string | tea name |
| temp | number | offset of temperature |
| ph | number | offset of PH |
| dox | number | offset of DO |
| brix | number | offset of BR |

## Create a TeaOffset
Create a teaOffset

### Route
`POST /teaOffsets`

### Body Parameters
| name | type | description |
| --- | --- | --- |
| teaId | number | (**required**) tea identifier |
| temp | number | offset of temperature |
| ph | number | offset of PH |
| dox | number | offset of DO |
| brix | number | offset of BR |

### Request Example
```sh
curl -X POST
    -H "accept-version: 2.0.0"
    -H "Content-Type: application/json"
    -d '{
      "teaId": 1,
      "temp": 1,
      "ph": 0.2,
      "dox": 0.1,
      "brix": 2,
    }'
     "http://{end-point}/teaOffsets"
```

### Response
Created teaOffset object on success, or error on failure.

### Response Example
``` json
{
  "id": 1,
  "teaId": 1,
  "teaName": "kombucha",
  "temp": 1,
  "ph": 0.2,
  "dox": 0.1,
  "brix": 2,
}
```

## Get teaOffsets
Get teaOffsets

### Route
`GET /teaOffsets`

### Request Example
```sh
curl -X GET
     "http://{end-point}/teaOffsets"
```

### Response
Retrieved result list of teaOffsets on success, or error on failure.

### Response Example
``` json
[{
  "id": 1,
  "teaId": 1,
  "teaName": "kombucha",
  "temp": 1,
  "ph": 0.2,
  "dox": 0.1,
  "brix": 2,
}]
```

## Update a TeaOffset
Update a teaOffset

### Route
`PATCH /teaOffsets/:teaOffsetId`

### Path Variables
| name | type | description |
| --- | --- | --- |
| teaOffsetId | string | (**required**) teaOffset identifier |

### Body Parameters
| name | type | description |
| --- | --- | --- |
| teaId | number | tea identifier |
| temp | number | offset of temperature |
| ph | number | offset of PH |
| dox | number | offset of DO |
| brix | number | offset of BR |

### Request Example
```sh
curl -X PATCH
    -H "accept-version: 2.0.0"
    -H "Content-Type: application/json"
    -d '{
      "temp": 0.5
    }'
     "http://{end-point}/teaOffsets/1"
```

### Response
Updated teaOffset object on success, or error on failure.

### Response Example
``` json
{
  "id": 1,
  "teaId": 1,
  "teaName": "kombucha",
  "temp": 0.5,
  "ph": 0.2,
  "dox": 0.1,
  "brix": 2,
}
```

## Delete a TeaOffset
Delete a teaOffset

### Route
`DELETE /teaOffsets`

### Body Parameters
| name | type | description |
| --- | --- | --- |
| id | number | teaOffset identifier |

### Request Example
```sh
curl -X DELETE
    -H "accept-version: 2.0.0"
    -H "Content-Type: application/json"
    -d '{
        "id": 1
      }'
     "http://{end-point}/teaOffsets"
```

### Response
Deleted teaOffset id on success, or error on failure.

### Response Example
``` json
{
  "id": 1
}
```