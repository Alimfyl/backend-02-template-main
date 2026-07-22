# Library REST API

REST API библиотеки на Express.js и MongoDB.

## Установка

```bash
npm install
```

Скопируйте `.env.example` в `.env` и при необходимости измените строку подключения к MongoDB.

## Запуск

Режим разработки:

```bash
npm run dev
```

Обычный запуск:

```bash
npm start
```

Сервер доступен по адресу:

```text
http://127.0.0.1:3005
```

## Пользователи

```text
GET    /users
POST   /users
GET    /users/:id
PATCH  /users/:id
PUT    /users/:id
DELETE /users/:id
```

Пример пользователя:

```json
{
  "name": "Иван",
  "surname": "Иванов",
  "username": "ivan1"
}
```

`name` и `surname` должны содержать от 2 до 20 символов.  
`username` должен содержать ровно 5 символов.

## Книги

```text
GET    /books
POST   /books
GET    /books/:id
PATCH  /books/:id
PUT    /books/:id
DELETE /books/:id
```

Пример книги:

```json
{
  "title": "Дюна",
  "author": "Фрэнк Герберт",
  "year": 1965
}
```

`title` и `author` должны содержать от 2 до 20 символов.  
`year` должен быть числом.

## Выдача книг

```text
GET    /users/:id/books
POST   /users/:id/books
DELETE /users/:id/books/:bookId
```

Тело запроса для выдачи книги:

```json
{
  "bookId": "MongoDB ObjectId книги"
}
```

## Ошибки

Все ошибки возвращаются в формате JSON:

```json
{
  "message": "Описание ошибки"
}
```

Несуществующая сущность или маршрут возвращают статус `404`.  
Необработанная серверная ошибка возвращает статус `500`.