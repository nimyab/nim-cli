import { execSync } from 'child_process';
import fs from 'fs-extra';
import path from 'path';
import { NodeEngines } from '../settings/engines';
import { NestScripts } from '../settings/scripts';

export const createNestProject = (projectName: string) => {
  const projectPath = path.join(process.cwd(), projectName);

  if (fs.existsSync(projectPath)) {
    console.error(`Error: dir with ${projectName} name already exist`);
    process.exit(1);
  }
  fs.mkdirSync(projectPath);

  execSync(`nest new ${projectName} -p pnpm`, { stdio: 'inherit' });

  execSync(
    'pnpm add @nestjs/jwt @nestjs/config @nestjs/swagger @prisma/client bcrypt cross-env zod nestjs-zod',
    {
      stdio: 'inherit',
      cwd: projectPath
    }
  );
  execSync('pnpm add -D @types/bcrypt @xerase/typify-cms prisma', {
    stdio: 'inherit',
    cwd: projectPath
  });

  const packageJsonPath = path.join(projectPath, 'package.json');
  const packageJson = fs.readJsonSync(packageJsonPath);
  packageJson.scripts = NestScripts;
  packageJson.engines = NodeEngines;
  fs.writeJsonSync(packageJsonPath, packageJson, { spaces: 2 });
  try {
    fs.removeSync(path.join(projectPath, '.prettierrc'));
  } catch (error) {
    console.log('.prettierrc not remove');
  }
  try {
    fs.copySync(path.join(__dirname, '../../templates/nest'), projectPath);
  } catch (error) {
    console.log('having problems copying files');
  }
};
