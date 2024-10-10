import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ConfigModule as InternalConfigModule } from '@nestjs/config';
import { configSchema } from 'src/schemas/config.schema';

@Module({
  providers: [ConfigService],
  exports: [ConfigService],
  imports: [
    InternalConfigModule.forRoot({
      isGlobal: true,
      validate: (config) => {
        return configSchema.parse(config, {
          errorMap: () => ({ message: 'Invalid env file' }),
        });
      },
    }),
  ],
})
export class ConfigModule {}
