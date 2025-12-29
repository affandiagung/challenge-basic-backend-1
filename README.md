#  IngetinGw API Services (ExpressJS)
Backend service built with ExorressJS for a simple reminder application with User Authentication, User-Based reminders , and Email Notification triggered at specific time using SMTP (Mailpit)

## ✨ Features
1. User authentication (login & token refresh)
2. Short-lived access token (expires in 20 seconds)
3. Refresh access token mechanism
4. Reminder CRUD operations (scoped to authenticated user)
5. Email notification when reminder is due
6. SMTP testing using Mailpit
7. Consistent API response format

## 🧱 Tech Stack
- Node.js
- Express.js – Web framework
- Zod – Request body validation
- Nodemailer – Email delivery
- [Mailpit](https://github.com/axllent/mailpit) – SMTP testing server
- Swagger – API documentation -  `swagger-jsdoc` & `swagger-ui-express`
- UUID – Token and identifier generation
- dotenv – Environment variable management
- Morgan – HTTP request logging
- CORS – Cross-Origin Resource Sharing support
- In-memory storage (no database)

## 🔐 Authentication

The API uses an access token and refresh token mechanism.

Token Types

| Token         | Purpose                     | Lifetime   |
| ------------- | --------------------------- | ---------- |
| Access Token  | Authenticate API requests   | 1 hour |
| Refresh Token | Generate a new access token | Long-lived |


## Authentication Flow

User logs in and receives an access token and a refresh token

Client includes the access token in the Authorization header:
```
Authorization: Bearer <access_token>
```

When the access token expires, the client requests a new one using the refresh token

Server returns a new access token

## 📁 Project Structure

```
docs/
│   ├── common_errors.md
│   └── rest_api.md
│
src/
│
├── config
│   └── mail.js
│   └── mail.js
│
├── data/
│   └── store.js
│
├── jobs/
│   └── reminder.job.js
│
├── middlewares/
│   └── auth.js
│
├── routes/
│   ├── index.js
│   ├── auth.routes.js
│   └── reminder.routes.js
│
├── services/
│   ├── auth.service.js
│   ├── mail.service.js
│   └── reminder.service.js
│
├── utils/
│   ├── response.js
│   ├── schema.js
│   └── time.js
│
├── app.js
├── server.js
│
README.md
```


