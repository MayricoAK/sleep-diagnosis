Sleep Disorder Backend

Feature and How to use (example):

Register
/auth/register || POST
```
{
    "name":"John Smith", 
    "email":"iamatomic@gmail.com", 
    "password":"123456", 
    "gender":"Male", 
    "birthDate":"2001-08-06"
}
```
Login
/auth/login || POST
```
{ 
    "email":"iamatomic@gmail.com", 
    "password":"123456"
}
```

Get user details
/user || GET || Bearer

Modify user details
/user || PUT || Bearer
```
{
    "name":"John Smith", 
    "gender":"Male", 
    "birthDate":"2001-08-06"
}
```

Modify user password
/update-password
```
{
    "currentPassword":"123456", 
    "newPassword":"12345"
}
```

Get user diagnosis
/diagnose   || GET || Bearer

Get details diagnosis
/diagnose:id   || GET || Bearer

Input new diagnosis
/diagnose   || POST || Bearer
```
{
  "sleepDuration": 3,
  "qualityOfSleep": 8,
  "physicalActivity": 12,
  "stressLevel": 8,
  "bloodPressure": "Stage 2",
  "heartRate": 110,
  "dailySteps": 800,
  "diagnosisDate": "06-08-2024",
  "height": 175,
  "weight": 50
}
```

Delete diagnosis by id
/diagnose/:id   || DELETE || Bearer

ENV
```
MONGO_URL=
PORT=
JWT_SECRET=
SLEEP_DISORDER_MODEL=
```

Note:
```
bloodPressure = {"Normal", "Stage 1", "Stage 2", "Advanced"}
```