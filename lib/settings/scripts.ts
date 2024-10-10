export const NestScripts = {
  build: 'nest build',
  format: 'prettier --write "src/**/*.ts" "test/**/*.ts"',
  start: 'cross-env NODE_ENV=dev nest start',
  'start:dev': 'cross-env NODE_ENV=dev nest start --watch',
  'start:debug': 'cross-env NODE_ENV=dev nest start --debug --watch',
  'start:prod': 'cross-env NODE_ENV=prod node dist/main',
  lint: 'eslint "{src,apps,libs,test}/**/*.ts" --fix',
  test: 'jest',
  'test:watch': 'jest --watch',
  'test:cov': 'jest --coverage',
  'test:debug':
    'node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand',
  'test:e2e': 'jest --config ./test/jest-e2e.json',
  'migrate:dev': 'prisma migrate dev --preview-feature',
  'migrate:reset': 'prisma migrate reset --preview-feature',
  'migrate:deploy': 'npx prisma migrate deploy --preview-feature',
  'migrate:status': 'npx prisma migrate status --preview-feature',
  'migrate:resolve': 'npx prisma migrate resolve --preview-feature',
  'prisma:studio': 'npx prisma studio',
  'prisma:generate': 'npx prisma generate',
  'prisma:generate:watch': 'npx prisma generate --watch',
  postinstall: 'pnpm migrate:deploy && pnpm prisma:generate'
};

export const EmptyScripts = {
  build: 'tsc',
  start: 'node dist/index.js',
  dev: 'tsx src/index.ts'
};
