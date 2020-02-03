# Backend

# Authentication

| Method |      Endpoint      |   Body(required)   | Body(optional) |
| :----- | :----------------: | :----------------: | :------------: |
| POST   | /api/auth/register | username, password |      N/A       |
| POST   |  /api/auth/login   | username, password |      N/A       |

# Meals

| Method |    Endpoint    | Body(required) | Body(optional) |
| :----- | :------------: | :------------: | :------------: |
| GET    |   /api/meals   |      N/A       |      N/A       |
| GET    | /api/meals/:id |      N/A       |      N/A       |
| POST   |   /api/meals   |      name      | date, category |
| PUT    | /api/meals/:id |      name      | date, category |
| DELETE | /api/meals/:id |      N/A       |      N/A       |

# Users

| Method |    Endpoint    | Body(required) | Body(optional) |
| :----- | :------------: | :------------: | :------------: |
| GET    |   /api/users   |      N/A       |      N/A       |
| DELETE | /api/users/:id |      N/A       |      N/A       |