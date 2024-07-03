## Installation

```bash
$ npm install
```

## Running the app

```bash
docker compose up
```

## Database

<p>Database design just for testing</p>
<h4>Users - PostgreSQL</h4>
<img src="https://i.ibb.co.com/1Mdg7TZ/database.png"/>

## Endpoints

<h4>POST - Create User (Register)</h4>

`http://localhost:3000/user/register`

<p>Parameters</p>

```
{
   "name": "adiet alimudin",
   "username": "adiet",
   "password": "test12345",
   "role": "admin",
   "score": 500 
}
```

<p>Response</p>

```
{
    "name": "adiet alimudin",
    "username": "adiet22",
    "password": "$2b$10$iKrIcQHpgY7Ivfkld0KWLOIlgOaoOwlIwlC11Kzsf0.kPr.oN1Gxa",
    "score": 500,
    "role": "admin",
    "id": 30,
    "createdAt": "2024-07-03T21:14:24.033Z",
    "updatedAt": "2024-07-03T21:14:24.033Z"
}
```

<h4>POST - Login </h4>

`http://localhost:3000/auth`

<p>Parameters</p>

```
{
   "username": "adiet22",
   "password": "Goenjhat"
}
```

<p>Response</p>

```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzIwMDQxODIyLCJleHAiOjE3MjAwODUwMjJ9._eBxrNBDsM0CP4HkcOEnp81L6VT39-0A7ZFlAhRnhMI"
}
```

<h4>POST - Update User's Score</h4>

`http://localhost:3000/scores`

<p>Parameters</p>

```
{
    "name": "adiet22",
    "score": 1000
}
```

<p>Response</p>

```
{
    "name": "adiet28",
    "score": 1000,
    "id": 30,
    "updatedAt": "2024-07-03T21:25:44.000Z"
}
```

<h4>GET - Leaderboard</h4>

<img src="https://i.ibb.co.com/ZWrMv9M/Screenshot-2024-07-04-050840.png"/>

`http://localhost:3000/leaderboard`

<p>Response</p>

```
[
     {
        "name": "adiet28",
        "score": 1000
    },
    {
        "name": "test3",
        "score": 800
    },
    {
        "name": "adiet4",
        "score": 500
    },
    {
        "name": "adiet7",
        "score": 500
    },
    {
        "name": "adiet8",
        "score": 500
    },
    {
        "name": "adiet9",
        "score": 500
    },
    {
        "name": "adiet10",
        "score": 500
    },
    {
        "name": "adiet11",
        "score": 500
    },
    {
        "name": "adiet23",
        "score": 500
    },
    {
        "name": "adiet24",
        "score": 500
    }
]
```

## Logging

<h4>Logging Data</h4>

<img src="https://i.ibb.co.com/3yF2SJb/Screenshot-2024-07-04-035158.png"/>