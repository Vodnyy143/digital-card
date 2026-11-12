import { z } from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number(),
  NODE_ENV: z.string(),

  DATABASE_URL: z.string(),
});

export type Env = z.infer<typeof envSchema>;
