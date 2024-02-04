## Steps

### The project has all the dependencies that I use in a large project where  en i'm implementing @nestjs-cls/transactional but not all are used in this example

```bash
$ npm install
```

## Running the app

```bash
# Run watch mode
$ npm run start:dev

# Migrate db - PostgreSQL
$ npx prisma migrate dev --name init

# production mode
$ npm run start:prod
```
