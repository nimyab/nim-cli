import { z } from 'zod';

export const configSchema = z.object({
  PORT: z.coerce.number(),
  JWT_SECRET: z.string(),
  JWT_ACCESS_TIME: z.string(),
  JWT_REFRESH_TIME: z.string(),
  DATABASE_URL: z.string(),
  SALT: z.coerce.number()
});

export type Config = z.infer<typeof configSchema>;
