## Project setup

```bash
$ pnpm install
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

# config files

## .env

```bash
# .env

DATABASE_URL="postgresql://[username]:[password]@localhost:5432/[databaseName]?schema=public"

```

## oss.config.ts

```ts
import * as OSS from 'ali-oss';

export const config: OSS.Options = {
  accessKeyId: 'your accessKeyId',
  accessKeySecret: 'your accessKeySecret',
  bucket: 'your bucket',
  region: 'your region',
  // callbackUrl: 'url',
};
```

# Run

## prisma init

```bash
pnpm prisma init

pnpm prisma migrate dev --name init
```
