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
    "build:compile": "npx babel --extensions .ts --out-dir dist --source-maps",
    "build:types": "tsc",
    "dev": "npx ts-node app.ts"
```


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