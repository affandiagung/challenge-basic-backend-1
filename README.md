#  IngetinGw API Services (ExpressJS)
Backend service built with ExorressJS for a simple reminder application with User Authentication, User-Based reminders , and Email Notification triggered at specific time using SMTP (Mailpit)

---
### ✨ Features
1. User authentication (login & token refresh)
2. Short-lived access token (expires in 20 seconds)
3. Refresh access token mechanism
4. Reminder CRUD operations (scoped to authenticated user)
5. Email notification when reminder is due
6. SMTP testing using Mailpit
7. Consistent API response format

---
### 🧱 Tech Stack
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
- Jest – Testing framework
- Supertest – HTTP assertions for API testing
- In-memory storage (no database)

---
### 🔐 Authentication

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

---
### 📁 Project Structure

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
test/
│   ├── reminder.test.js
│   ├── session.test.js
│   └── setup.js
│
├── .gitignore
├── .env_example
│
README.md
```

---
### ⏰ Reminder Notification Rules

- Email is sent **exactly when `remind_at` is reached**
- No rule for "minutes before the event"
- `event_at` is for **informational purposes only**
- Scheduler runs periodically every second (polling in-memory data)





---


## 🚀 Installation & Setup

1. Clone the repository:
```bash
    git clone https://github.com/affandiagung/challenge-basic-backend-1
    cd challenge-basic-backend-1
```

2. Install Dependencies
```bash
    npm install
```

3. Copy .env.example to .env and update values:
```bash
    cp .env.example .env
```
Environment Variables
| Variable             | Description                | Example    |
| -------------------- | -------------------------- | ---------- |
| PORT                 | Server port                | 5000       |
| SMTP_HOST            | SMTP server host           | localhost  |
| SMTP_PORT            | SMTP server port           | 1025       |

4. Start server (development mode):
```bash
    npm run dev
```

## 📜 API Documentation (Swagger)

By default, Swagger documentation is available at:

[http://localhost:5000/api/swagger](http://localhost:5000/api/swagger)

> Note: If you change the `PORT` value in your `.env` file, replace `5000` with the port number you set.


## 🧪 Testing

Run tests with:
```bash
    npm run test
```