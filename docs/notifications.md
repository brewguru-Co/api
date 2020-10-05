# Notification
알림 히스토리(notification)에 대한 정보를 생성, 조회, 수정, 삭제하는 API

## Notification object
| name | type | description |
| --- | --- | --- |
| id | number | notification identifier |
| batchId | number | batch identifier |
| code | string | error code |
| max | number | max limit value |
| min | number | min limit value |
| value | number | measured value |
| action | string | how error has been handled |
| createdAt | timestamp | error occurred time |

## Create a Notification
Create a notification

### Route
`POST /notifications`

### Body Parameters
| name | type | description |
| --- | --- | --- |
| batchId | number | (**required**) batch identifier |
| code | string | (**required**) error code |
| max | number | (**required**) max limit value |
| min | number | (**required**) min limit value |
| value | number | (**required**) measured value |

### Request Example
```sh
curl -X POST
    -H "accept-version: 2.0.0"
    -H "Content-Type: application/json"
    -d '{
      "batchId": 1,
	    "code": "PhHighLimitOver",
	    "max": 3.5,
      "min": 2.5,
      "value": 3.6
    }'
     "http://{end-point}/notifications"
```

### Response
Created notification object on success, or error on failure.

### Response Example
``` json
{
  "id": 1,
  "batchId": 1,
  "code": "PhHighLimitOver",
  "max": 3.5,
  "min": 2.5,
  "value": 3.6,
  "action": null,
  "createdAt": 1593932595
}
```

## Get notifications
Get notifications

### Route
`GET /notifications`

### Request Example
```sh
curl -X GET
     "http://{end-point}/notifications"
```

### Response
Retrieved result list of notifications on success, or error on failure.

### Response Example
``` json
[{
  "id": 1,
  "batchId": 1,
  "code": "PhHighLimitOver",
  "max": 3.5,
  "min": 2.5,
  "value": 3.6,
  "action": null,
  "createdAt": 1593932595
}]
```

## Update a Notification
Update a notification

### Route
`PATCH /notifications/:notificationId`

### Path Variables
| name | type | description |
| --- | --- | --- |
| notificationId | string | (**required**) notification identifier |

### Body Parameters
| name | type | description |
| --- | --- | --- |
| batchId | number | batch identifier |
| code | string | error code |
| max | number | max limit value |
| min | number | min limit value |
| value | number | measured value |
| action | string | how error has been handled |

### Request Example
```sh
curl -X PATCH
    -H "accept-version: 2.0.0"
    -H "Content-Type: application/json"
    -d '{
      "action": "test"
    }'
     "http://{end-point}/notifications/1"
```

### Response
Updated notification object on success, or error on failure.

### Response Example
``` json
{
  "id": 1,
  "batchId": 1,
  "code": "PhHighLimitOver",
  "max": 3.5,
  "min": 2.5,
  "value": 3.6,
  "action": "test",
  "createdAt": 1593932595
}
```

## Delete a Notification
Delete a notification

### Route
`DELETE /notifications`

### Body Parameters
| name | type | description |
| --- | --- | --- |
| id | number | notification identifier |

### Request Example
```sh
curl -X DELETE
    -H "accept-version: 2.0.0"
    -H "Content-Type: application/json"
    -d '{
        "id": 1
      }'
     "http://{end-point}/notifications"
```

### Response
Deleted notification id on success, or error on failure.

### Response Example
``` json
{
  "id": 1
}
```