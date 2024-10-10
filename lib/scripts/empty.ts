import { execSync } from 'child_process';
import fs from 'fs-extra';
import path from 'path';
import { NodeEngines } from '../settings/engines';
import { EmptyScripts } from '../settings/scripts';

export const createEmptyProject = (projectName: string) => {
  const projectPath = path.join(process.cwd(), projectName);

  if (fs.existsSync(projectPath)) {
    console.error(`Error: dir with ${projectName} name already exist`);
    process.exit(1);
  }
  fs.mkdirSync(projectPath);

  execSync('npm init -y', { cwd: projectPath, stdio: 'inherit' });

  execSync('pnpm add -D typescript tsx @types/node @mkas3/prettier', {
    cwd: projectPath,
    stdio: 'inherit'
  });

  const packageJsonPath = path.join(projectPath, 'package.json');
  const packageJson = fs.readJsonSync(packageJsonPath);
  packageJson.scripts = EmptyScripts;
  packageJson.engines = NodeEngines;
  fs.writeJsonSync(packageJsonPath, packageJson, { spaces: 2 });

  fs.copySync(path.join(__dirname, '../templates/empty'), projectPath);
};
