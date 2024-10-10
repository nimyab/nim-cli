import { Injectable } from '@nestjs/common';
import { ConfigService as InternalConfigService } from '@nestjs/config';
import { Config } from 'src/schemas/config.schema';

@Injectable()
export class ConfigService extends InternalConfigService<Config, true> {}
