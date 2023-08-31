# movies-explorer-api

# Дипломный проект бэкенд

## Директории

`/routes` — папка с файлами роутера  
`/controllers` — папка с файлами контроллеров пользователя и карточки   
`/models` — папка с файлами описания схем пользователя и карточки  
  
## Запуск проекта

`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload

## Docs_route

### Реализация аутентификации и авторизации

<details>
<summary>POST /signup</summary>
создаёт пользователя с переданными в теле email, password и name

Заголовки:
```bash 
"Content-Type": "application/json"
```

Тело запроса:
```bash 
{
    "email": "em4@em3.ru",
    "password": "777777",
    "name": "test"
}
```

Успешный ответ `201`:
```bash 
{
    "_id": "64ef48da3c23e5c43423185d",
    "email": "em4@em3.ru",
    "name": "test"
}
```

Коды ошибок:
```bash 
400 - Некорректно заполнено одно из полей 
409 - Данный email уже существует
```

</details>


<details>
<summary>POST /signin</summary>
проверяет переданные в теле почту и пароль и возвращает JWT

Заголовки:
```bash 
"Content-Type": "application/json"
```

Тело запроса:
```bash 
{
    "email": "em4@em3.ru",
    "password": "777777"
}
```

Успешный ответ `200`:
```bash 
{
    "token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjUxNDhlNWJiODhmZGNhOTIxYjZhYzciLCJpYXQiOjE1OTkyMTExNzN9.Q3DVLh7t0f0BjyG9gh3UlUREYQxl2chdGTGy701lF6I"
}
```

Коды ошибок:
```bash 
400 - Некорректно заполнено одно из полей 
401 - пользователь с email не найден 
```
</details>

###  Закрытые роуты 

<details>
<summary>GET /users/me</summary>
возвращает информацию о пользователе (email и имя)

Заголовки:
```bash 
{
    "Content-Type": "application/json",
    "Authorization" : `Bearer ${ВАШ JWT}`
} 
```

Успешный ответ `200`:
```bash 
{
    "_id": "64ef48da3c23e5c43423185d",
    "name": "test",
    "email": "em4@em3.ru"
} 
```

Коды ошибок:
```bash 
401 — Переданный токен некорректен 
```
</details>

<details>
<summary>PATCH /users/me</summary>
обновляет информацию о пользователе (email и имя)

Заголовки:
```bash 
{
    "Content-Type": "application/json",
    "Authorization" : `Bearer ${ВАШ JWT}`
} 
```

Тело запроса:
```bash 
{
    "name": "test3333",
    "email": "em4@em3.ru"
}
```

Успешный ответ `200`:
```bash 
{
    "_id": "64ef48da3c23e5c43423185d",
    "name": "test3333",
    "email": "em4@em3.ru"
}
```
Коды ошибок:
```bash 
400 - Некорректно заполнено одно из полей 
```

</details>
