#!/usr/bin/env node

const { Command } = require("commander");
const fs = require("fs-extra");
const path = require("path");
const { execSync } = require("child_process");

const program = new Command();

const createEmptyProject = (projectName) => {
  const projectPath = path.join(process.cwd(), projectName);

  if (fs.existsSync(projectPath)) {
    console.error(`Error: dir with ${projectName} name already exist`);
    process.exit(1);
  }
  fs.mkdirSync(projectPath);

  execSync("npm init -y", { cwd: projectPath, stdio: "inherit" });

  execSync("pnpm install typescript ts-node --save-dev", {
    cwd: projectPath,
    stdio: "inherit",
  });

  const packageJsonPath = path.join(projectPath, "package.json");
  const packageJson = fs.readJsonSync(packageJsonPath);

  packageJson.scripts = {
    ...packageJson.scripts,
    build: "tsc",
    start: "node dist/index.js",
    dev: "ts-node src/index.ts",
  };

  fs.writeJsonSync(packageJsonPath, packageJson, { spaces: 2 });

  const tsconfig = {
    compilerOptions: {
      target: "ES6",
      module: "commonjs",
      strict: true,
      esModuleInterop: true,
      skipLibCheck: true,
      forceConsistentCasingInFileNames: true,
      outDir: "./dist",
    },
    include: ["src/**/*"],
    exclude: ["node_modules"],
  };

  fs.writeFileSync(
    path.join(projectPath, "tsconfig.json"),
    JSON.stringify(tsconfig, null, 2)
  );
  const srcPath = path.join(projectPath, "src");
  fs.mkdirSync(srcPath);
  fs.writeFileSync(
    path.join(srcPath, "index.ts"),
    "console.log('Hello nim!');"
  );
};

const createNestProject = (projectName, isDefault) => {
  const projectPath = path.join(process.cwd(), projectName);

  if (fs.existsSync(projectPath)) {
    console.error(`Error: dir with ${projectName} name already exist`);
    process.exit(1);
  }
  fs.mkdirSync(projectPath);

  execSync(`nest new ${projectName}`, { stdio: "inherit" });

  if (!isDefault) {
    const projectPath = path.join(process.cwd(), projectName);

    execSync(
      "pnpm add @nestjs/jwt @nestjs/swagger @prisma/client bcrypt cross-env",
      { stdio: "inherit", cwd: projectPath }
    );
    execSync("pnpm add -D @types/bcrypt @xerase/typify-cms prisma", {
      stdio: "inherit",
      cwd: projectPath,
    });

    console.log("add custom package.json");
    const packageJsonPath = path.join(projectPath, "package.json");
    const packageJson = fs.readJsonSync(packageJsonPath);

    packageJson.scripts = {
      build: "nest build",
      format: 'prettier --write "src/**/*.ts" "test/**/*.ts"',
      start: "cross-env NODE_ENV=dev nest start",
      "start:dev": "cross-env NODE_ENV=dev nest start --watch",
      "start:debug": "cross-env NODE_ENV=dev nest start --debug --watch",
      "start:prod": "cross-env NODE_ENV=prod node dist/main",
      lint: 'eslint "{src,apps,libs,test}/**/*.ts" --fix',
      test: "jest",
      "test:watch": "jest --watch",
      "test:cov": "jest --coverage",
      "test:debug":
        "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
      "test:e2e": "jest --config ./test/jest-e2e.json",
      "migrate:dev": "prisma migrate dev --preview-feature",
      "migrate:reset": "prisma migrate reset --preview-feature",
      "migrate:deploy": "npx prisma migrate deploy --preview-feature",
      "migrate:status": "npx prisma migrate status --preview-feature",
      "migrate:resolve": "npx prisma migrate resolve --preview-feature",
      "prisma:studio": "npx prisma studio",
      "prisma:generate": "npx prisma generate",
      "prisma:generate:watch": "npx prisma generate --watch",
      postinstall: "pnpm migrate:deploy && pnpm prisma:generate",
    };

    fs.writeJsonSync(packageJsonPath, packageJson, { spaces: 2 });
  }
};

program
  .command("empty <projectName>")
  .description("create new project with ts")
  .action((projectName) => {
    createEmptyProject(projectName);
    console.log("success.");
  });

program
  .command("nest-default <projectName>")
  .description("create new nest default project")
  .action((projectName) => {
    createNestProject(projectName, true);
    console.log("success.");
  });

program
  .command("nest-custom <projectName>")
  .description("create new nest custom xerase project")
  .action((projectName) => {
    createNestProject(projectName, false);
    console.log("success.");
  });

program.parse(process.argv);
