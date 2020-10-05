# NotificationTargets

수신 대상(notificationTarget)에 대한 정보를 생성, 조회, 수정, 삭제하는 API

## NotificationTarget object

| name  | type    | description                   |
| ----- | ------- | ----------------------------- |
| id    | number  | notificationTarget identifier |
| name  | string  | human readable name           |
| email | string  | email                         |
| phone | string  | phone                         |
| on    | boolean | notificationTarget on/off     |

## Create a notificationTarget

Create a notificationTarget

### Route

`POST /notificationTargets`

### Body Parameters

| name  | type    | description                                         |
| ----- | ------- | --------------------------------------------------- |
| name  | string  | (**required**) human readable name                  |
| email | string  | email (least one of [email, phone] should be exist) |
| phone | string  | phone (least one of [email, phone] should be exist) |
| on    | boolean | notificationTarget on/off (default: on)             |

### Request Example

```sh
curl -X POST
    -H "accept-version: 2.0.0"
    -H "Content-Type: application/json"
    -d '{
      "name": "cs"
      "email": "cs@brewguru.com",
      "on": false,
    }'
     "http://{end-point}/notificationTargets"
```

### Response

Created notificationTarget object on success, or error on failure.

### Response Example

```json
{
  "id": 1,
  "name": "cs",
  "email": "cs@brewguru.com",
  "phone": null,
  "on": false
}
```

## Get notificationTargets

Get notificationTargets

### Route

`GET /notificationTargets`

### Request Example

```sh
curl -X GET
     "http://{end-point}/notificationTargets"
```

### Response

Retrieved result list of notificationTargets on success, or error on failure.

### Response Example

```json
[
  {
    "id": 1,
    "name": "cs",
    "email": "cs@brewguru.com",
    "phone": null,
    "on": false
  }
]
```

## Update a notificationTarget

Update a notificationTarget

### Route

`PATCH /notificationTargets/:notificationTargetId`

### Path Variables

| name                 | type   | description                                  |
| -------------------- | ------ | -------------------------------------------- |
| notificationTargetId | string | (**required**) notificationTarget identifier |

### Body Parameters

| name  | type    | description                             |
| ----- | ------- | --------------------------------------- |
| name  | string  | human readable name                     |
| email | string  | email                                   |
| phone | string  | phone                                   |
| on    | boolean | notificationTarget on/off (default: on) |

### Request Example

```sh
curl -X PATCH
    -H "accept-version: 2.0.0"
    -H "Content-Type: application/json"
    -d '{
      "email": "dev@brewguru.com"
    }'
     "http://{end-point}/notificationTargets/1"
```

### Response

Updated notificationTarget object on success, or error on failure.

### Response Example

```json
{
  "id": 1,
  "name": "cs",
  "email": "dev@brewguru.com",
  "phone": null,
  "on": false
}
```

## Delete a notificationTarget

Delete a notificationTarget

### Route

`DELETE /notificationTargets`

### Body Parameters
| name | type | description |
| --- | --- | --- |
| id | number | notification target identifier |

### Request Example

```sh
curl -X DELETE
    -H "accept-version: 2.0.0"
    -H "Content-Type: application/json"
    -d '{
        "id": 1
      }'
     "http://{end-point}/notificationTargets/1"
```

### Response

Deleted notificationTarget id on success, or error on failure.

### Response Example

```json
{
  "id": 1
}
```
