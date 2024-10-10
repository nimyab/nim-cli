import { z } from 'zod';

import { IdSchema } from '@/schemas/controller.schema';
import { RoleSchema } from './role.schema';

const TokenTypeEnum = z.enum(['access', 'refresh']);

export const PayloadSchema = z.object({
  id: IdSchema,
  role: RoleSchema,
  tokenType: TokenTypeEnum
});

export type Payload = z.infer<typeof PayloadSchema>;

export type TokenEnumType = z.infer<typeof TokenTypeEnum>;
