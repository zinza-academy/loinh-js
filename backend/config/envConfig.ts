import * as dotenv from 'dotenv';
import { z } from 'zod';

const envConfig = dotenv.config().parsed!;

// zod schema for environment validation
const envSchema = z.object({
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  FRONTEND_URL: z.string().url('FRONTEND_URL must be a valid URL'),
});

// type inference from Zod schema
type EnvConfig = z.infer<typeof envSchema>;

interface DatabaseIF {
  DATABASE_URL: string;
}

export interface AppConfiguration {
  frontendUrl: string;
  database: DatabaseIF;
}

// validate environment variables
function validateEnv(): EnvConfig {
  try {
    return envSchema.parse({
      DATABASE_URL: envConfig?.DATABASE_URL,
      FRONTEND_URL: envConfig?.FRONTEND_URL,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = error.errors.map(err => `${err.path.join('.')}: ${err.message}`).join(', ');
      throw new Error(`Environment validation failed: ${errorMessage}`);
    }
    throw error;
  }
}

// get validated environment
const validatedEnv = validateEnv();

export const env: AppConfiguration = {
  frontendUrl: validatedEnv.FRONTEND_URL,
  database: {
    DATABASE_URL: validatedEnv.DATABASE_URL,
  },
};

export default (): AppConfiguration => {
  return env;
};

export function validateEnvConfig() {
  validateEnv();
}