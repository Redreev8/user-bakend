# User rest api + jwt token

## Stac
- express
- ts
- redis
- prosgres
- jwt 
- eslint
- prettier
- babel

## comands 
```json
    "prettier": "prettier --write \"**/*.ts\"",
    "prettier:check": "prettier --check \"**/*.ts\"",
    "lint": "eslint --ignore-path .eslintignore \"**/*.ts\" --fix",
    "lint:check": "eslint --ignore-path .eslintignore \"**/*.ts\"",
    "build": "babel ./ --out-dir dist --extensions .ts --source-maps",
    "build:types": "tsc",
    "dev": "npx ts-node app.ts",
    "start": "node ./dist/app.js",
    "drop": "npx ts-node ./migrations/dropTable.ts"
```

## ENV
```
DB_USER=
DB_HOST=
DB_NAME=
DB_PASSWORD=
DB_PORT=

JWT_SECRET=

USER_NAME=insanus
USER_PASSWORD=obsidanAnalog
```

## Первый пользователь
Если пользователей нет то он создасться и выводит в консоль token

## Api
### POST /register/
#### body
- **name** имя пользователя
- **password** пароль

возращает JWt токен

### POST /login/
- **name** имя пользователя
- **password** пароль

возращает JWt токен

### GET: /check-token/
#### Header
- **auth-token** jwt токен

возращает boolean

### GET: /token-payload/
#### Header
- **auth-token** jwt токен

возращает payload зашиврованый в токен

### POST /token/
#### Header
- **auth-token** jwt токен

#### body
- **payload** даные для токена

возращает создает токен с payload придающимся в body

### POST /logut/
#### Header
- **auth-token** jwt токен

#### body
- **payload** даные для токена

уничтожает **auth-token**

### GET: /roles/
#### Header
- **auth-token** jwt токен

возращает role-list

### GET: /roles/:id
#### Header
- **auth-token** jwt токен

возращает role

### POST: /roles/
#### Header
- **auth-token** jwt токен
#### body
- **name** string

возращает role

### PATCH: /roles/:id
#### Header
- **auth-token** jwt токен
#### body
- **name** string

возращает role

### DELETE: /roles/:id
#### Header
- **auth-token** jwt токен

пустую строку

### GET: /actions/
#### Header
- **auth-token** jwt токен

возращает actions-list

### GET: /actions/:id
#### Header
- **auth-token** jwt токен

возращает action

### POST: /actions/
#### Header
- **auth-token** jwt токен
#### body
- **action** string

возращает action

### PATCH: /actions/:id
#### Header
- **auth-token** jwt токен
#### body
- **action** string

возращает action

### DELETE: /actions/:id
#### Header
- **auth-token** jwt токен

пустую строку

### PUT: /role-actions/:roleId
#### Header
- **auth-token** jwt токен
#### Body
- **actions** масив индексов action

пустую строку