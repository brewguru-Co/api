# Teas

차(tea)에 대한 정보를 생성, 조회, 수정, 삭제하는 API

## Tea object

| name       | type   | description                      |
| ---------- | ------ | -------------------------------- |
| id         | number | tea identifier                   |
| name       | string | tea name                         |
| tempHighOp | number | optimal max value of temperature |
| tempLowOp  | number | optimal min value of temperature |
| phHighOp   | number | optimal max value of PH          |
| phLowOp    | number | optimal min value of PH          |
| doxHighOp  | number | optimal max value of DO          |
| doxLowOp   | number | optimal min value of DO          |
| brixHighOp | number | optimal max value of Brix        |
| brixLowOp  | number | optimal min value of Brix        |

## Create a Tea

Create a tea

### Route

`POST /teas`

### Body Parameters

| name       | type   | description                      |
| ---------- | ------ | -------------------------------- |
| name       | string | (**required**) tea name          |
| tempHighOp | number | optimal max value of temperature |
| tempLowOp  | number | optimal min value of temperature |
| phHighOp   | number | optimal max value of PH          |
| phLowOp    | number | optimal min value of PH          |
| doxHighOp  | number | optimal max value of DO          |
| doxLowOp   | number | optimal min value of DO          |
| brixHighOp | number | optimal max value of Brix        |
| brixLowOp  | number | optimal min value of Brix        |

### Request Example

```sh
curl -X POST
    -H "accept-version: 2.0.0"
    -H "Content-Type: application/json"
    -d '{
      "name": "kombucha",
      "tempHighOp": 30,
      "tempLowOp": 29.5,
      "phHighOp": 3.5,
      "phLowOp": 3,
      "doxHighOp": 80,
      "doxLowOp": 78,
    }'
     "http://{end-point}/teas"
```

### Response

Created tea object on success, or error on failure.

### Response Example

```json
{
  "id": 1,
  "name": "kombucha",
  "tempHighOp": 30,
  "tempLowOp": 29.5,
  "phHighOp": 3.5,
  "phLowOp": 3,
  "doxHighOp": 80,
  "doxLowOp": 78,
  "brixHighOp": null,
  "brixLowOp": null
}
```

## Get teas

Get teas

### Route

`GET /teas`

### Request Example

```sh
curl -X GET
     "http://{end-point}/teas"
```

### Response

Retrieved result list of teas on success, or error on failure.

### Response Example

```json
[
  {
    "id": 1,
    "name": "kombucha",
    "tempHighOp": 30,
    "tempLowOp": 29.5,
    "phHighOp": 3.5,
    "phLowOp": 3,
    "doxHighOp": 80,
    "doxLowOp": 78,
    "brixHighOp": null,
    "brixLowOp": null
  }
]
```

## Update a Tea

Update a tea

### Route

`PATCH /teas/:teaId`

### Path Variables

| name  | type   | description                   |
| ----- | ------ | ----------------------------- |
| teaId | string | (**required**) tea identifier |

### Body Parameters

| name       | type   | description                      |
| ---------- | ------ | -------------------------------- |
| name       | string | tea name                         |
| tempHighOp | number | optimal max value of temperature |
| tempLowOp  | number | optimal min value of temperature |
| phHighOp   | number | optimal max value of PH          |
| phLowOp    | number | optimal min value of PH          |
| doxHighOp  | number | optimal max value of DO          |
| doxLowOp   | number | optimal min value of DO          |
| brixHighOp | number | optimal max value of Brix        |
| brixLowOp  | number | optimal min value of Brix        |

### Request Example

```sh
curl -X PATCH
    -H "accept-version: 2.0.0"
    -H "Content-Type: application/json"
    -d '{
      "name": "green tea"
    }'
     "http://{end-point}/teas/1"
```

### Response

Updated tea object on success, or error on failure.

### Response Example

```json
{
  "id": 1,
  "name": "green tea",
  "tempHighOp": 30,
  "tempLowOp": 29.5,
  "phHighOp": 3.5,
  "phLowOp": 3,
  "doxHighOp": 80,
  "doxLowOp": 78,
  "brixHighOp": null,
  "brixLowOp": null
}
```

## Delete a Tea

Delete a tea

### Route

`DELETE /teas/:teaId`

### Request Example

```sh
curl -X DELETE
     "http://{end-point}/teas/1"
```

### Response

Deleted tea id on success, or error on failure.

### Response Example

```json
{
  "id": 1
}
```
