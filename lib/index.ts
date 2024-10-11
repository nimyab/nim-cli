#!/usr/bin/env node

import { Command } from 'commander';
import { createEmptyProject } from './scripts/empty';
import { createNestProject } from './scripts/nest';
import { createTgBotProject } from './scripts/tg-bot';
import { createExpressProject } from './scripts/express';

const program = new Command();

program
  .command('empty <projectName>')
  .description('create new nodejs project with ts')
  .action((projectName: string) => {
    createEmptyProject(projectName);
    console.log('success.');
  });

program
  .command('nest-app <projectName>')
  .description('create new nest custom xerase project')
  .action((projectName: string) => {
    createNestProject(projectName);
    console.log('success.');
  });

program
  .command('tg-bot <projectName>')
  .description('create new nodejs project for tg-bot')
  .action((projectName: string) => {
    createTgBotProject(projectName);
    console.log('success.');
  });

program
  .command('express <projectName>')
  .description('create new express app')
  .action((projectName: string) => {
    createExpressProject(projectName);
    console.log('success.');
  });

program.parse(process.argv);
