import { CanActivate, Injectable, UseGuards } from '@nestjs/common';

import { Execution, execution } from '../utils/execution';

@Injectable()
export class ExecutionGuard implements CanActivate {
  constructor(private readonly expectedExecution: Execution) {}

  canActivate() {
    return execution === this.expectedExecution;
  }
}

export const UseExecutionGuard = (expectedExecution: Execution) =>
  UseGuards(new ExecutionGuard(expectedExecution));
