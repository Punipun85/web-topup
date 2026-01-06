# API CONTRACT – TOPUP

## Admin

GET /api/admin/topups
PUT /api/admin/topups/{id}/status
GET /api/admin/dashboard

Status:
- pending
- success
- failed

## User

POST /api/topup
POST /api/topup/check
GET /api/topup/public/{topup_code}
