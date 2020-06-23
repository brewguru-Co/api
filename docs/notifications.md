# Notifications
알림(notification)에 대한 정보를 생성, 조회, 수정, 삭제하는 API

## notification object
| name | type | description |
| --- | --- | --- |
| id | number | notification identifier |
| email | string | email |
| phone | string | phone |

## Create a notification
Create a notification

### Route
`POST /notifications`

### Body Parameters
| name | type | description |
| --- | --- | --- |
| email | string | email |
| phone | string | phone |

### Request Example
```sh
curl -X POST
    -H "accept-version: 2.0.0"
    -H "Content-Type: application/json"
    -d '{
      "email": "cs@brewguru.com",
      "phone": "01012341234"
    }'
     "http://{end-point}/notifications"
```

### Response
Created notification object on success, or error on failure.

### Response Example
``` json
{
  "id": 1,
  "email": "cs@brewguru.com",
  "phone": "01012341234"
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
  "email": "cs@brewguru.com",
  "phone": "01012341234"
}]
```

## Update a notification
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
| email | string | email |
| phone | string | phone |

### Request Example
```sh
curl -X PATCH
    -H "accept-version: 2.0.0"
    -H "Content-Type: application/json"
    -d '{
      "email": "dev@brewguru.com"
    }'
     "http://{end-point}/notifications/1"
```

### Response
Updated notification object on success, or error on failure.

### Response Example
``` json
{
  "id": 1,
  "email": "dev@brewguru.com",
  "phone": "01012341234"
}
```

## Delete a notification
Delete a notification

### Route
`DELETE /notifications/:notificationId`

### Request Example
```sh
curl -X DELETE
     "http://{end-point}/notifications/1"
```

### Response
Deleted notification id on success, or error on failure.

### Response Example
``` json
{
  "id": 1
}
```