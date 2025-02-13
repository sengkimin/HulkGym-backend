# Hulk Gym Back-End API

Resource: https://github.com/yagop/node-telegram-bot-api/blob/master/doc/api.md

### Prerequisite

- Create a Telegram Bot [Color + HulkGym] using BotFather (you will get telegram url to your bot & token)

### Create `.env.dev`

```bash
DB_HOST=...
DB_PORT=...
DB_USERNAME=...
DB_PASSWORD=...
DB_DATABASE=...
NODE_ENV=...
JWT_SECRET=...
TELEGRAM_URL=...
TELEGRAM_TOKEN=...
PGADMIN_EMAIL=...
PGADMIN_PASSWORD=...
```

### Docker compose

```bash
services:
  backend:
    build: .
    ports:
      - "3001:3000"
    environment:
      DB_HOST: ${DB_HOST}
      DB_PORT: ${DB_PORT}
      DB_USERNAME: ${DB_USERNAME}
      DB_PASSWORD: ${DB_PASSWORD}
      DB_DATABASE: ${DB_DATABASE}
      NODE_ENV: ${NODE_ENV}
      JWT_SECRET: ${JWT_SECRET}
      TELEGRAM_TOKEN: ${TELEGRAM_TOKEN}
    depends_on:
      - database
    volumes:
      - .:/usr/src/app
      - /usr/src/app/node_modules

  database:
    image: postgres:14-alpine
    restart: always
    ports:
      - "5439:5432"
    volumes:
      - postgres-data:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql
    environment:
      - POSTGRES_USER=${DB_USERNAME}
      - POSTGRES_PASSWORD=${DB_PASSWORD}
      - POSTGRES_DB=${DB_DATABASE}

  pgadmin:
    image: dpage/pgadmin4
    restart: always
    ports:
      - "5051:80"
    environment:
      - PGADMIN_DEFAULT_EMAIL=${PGADMIN_EMAIL}
      - PGADMIN_DEFAULT_PASSWORD=${PGADMIN_PASSWORD}
    depends_on:
      - database
    volumes:
      - pgadmin-data:/var/lib/pgadmin

volumes:
  postgres-data:
  pgadmin-data:

```

### Run docker compose services

```bash
docker compose --env-file .env.dev -f compose.dev.yml up -d --build

?

?

npm run migration:generate
npm run migration:run
```
