import * as dotenv from 'dotenv';
import { z } from 'zod';

const envConfig = dotenv.config().parsed!;

// zod schema for environment validation
const envSchema = z.object({
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  FRONTEND_URL: z.string().url('FRONTEND_URL must be a valid URL'),
  JWT_ACCESS_TOKEN_SECRET: z.string(),
  JWT_ACCESS_TOKEN_EXPIRE: z.string(),
  JWT_REFRESH_TOKEN_SECRET: z.string(),
  JWT_REFRESH_TOKEN_EXPIRE: z.string(),
  JWT_RESET_PASSWORD_SECRET: z.string(),
  JWT_RESET_PASSWORD_EXPIRE: z.string(),
  RESET_CODE_EXPIRE: z.string(),
  SALT_ROUNDS: z
    .string()
    .default('10')
    .transform((val) => parseInt(val, 10)),
  MINIO_ENDPOINT: z.string().default('localhost'),
  MINIO_EXTERNAL_ENDPOINT: z.string().default('localhost'),
  MINIO_PORT: z
    .string()
    .default('9000')
    .transform((val) => parseInt(val, 10)),
  MINIO_USE_SSL: z
    .string()
    .default('false')
    .transform((val) => val === 'true'),
  MINIO_ACCESS_KEY: z.string().default('admin123'),
  MINIO_SECRET_KEY: z.string().default('123456789'),
});

// type inference from Zod schema
type EnvConfig = z.infer<typeof envSchema>;

interface DatabaseIF {
  DATABASE_URL: string;
}

interface AuthConfigIF {
  RESET_CODE_EXPIRE: string;
  SALT_ROUNDS: number;
}

interface JwtIF {
  JWT_ACCESS_TOKEN_SECRET: string;
  JWT_ACCESS_TOKEN_EXPIRE: string;
  JWT_REFRESH_TOKEN_SECRET: string;
  JWT_REFRESH_TOKEN_EXPIRE: string;
  JWT_RESET_PASSWORD_SECRET: string;
  JWT_RESET_PASSWORD_EXPIRE: string;
}

export interface MinIOIF {
  endPoint: string;
  minioExternalEndpoint: string;
  port: number;
  useSSL: boolean;
  accessKey: string;
  secretKey: string;
}

export interface AppConfiguration {
  frontendUrl: string;
  database: DatabaseIF;
  jwt: JwtIF;
  auth: AuthConfigIF;
  minio: MinIOIF;
}

// validate environment variables
function validateEnv(): EnvConfig {
  try {
    return envSchema.parse({
      DATABASE_URL: envConfig?.DATABASE_URL,
      FRONTEND_URL: envConfig?.FRONTEND_URL,
      JWT_ACCESS_TOKEN_SECRET: envConfig?.JWT_ACCESS_TOKEN_SECRET,
      JWT_ACCESS_TOKEN_EXPIRE: envConfig?.JWT_ACCESS_TOKEN_EXPIRE,
      JWT_REFRESH_TOKEN_SECRET: envConfig?.JWT_REFRESH_TOKEN_SECRET,
      JWT_REFRESH_TOKEN_EXPIRE: envConfig?.JWT_REFRESH_TOKEN_EXPIRE,
      JWT_RESET_PASSWORD_SECRET: envConfig?.JWT_RESET_PASSWORD_SECRET,
      JWT_RESET_PASSWORD_EXPIRE: envConfig?.JWT_RESET_PASSWORD_EXPIRE,
      RESET_CODE_EXPIRE: envConfig?.RESET_CODE_EXPIRE,
      SALT_ROUNDS: envConfig?.SALT_ROUNDS,
      MINIO_ENDPOINT: envConfig?.MINIO_ENDPOINT,
      MINIO_EXTERNAL_ENDPOINT: envConfig?.MINIO_EXTERNAL_ENDPOINT,
      MINIO_PORT: envConfig?.MINIO_PORT,
      MINIO_USE_SSL: envConfig?.MINIO_USE_SSL, // Remove the manual boolean conversion
      MINIO_ACCESS_KEY: envConfig?.MINIO_ACCESS_KEY,
      MINIO_SECRET_KEY: envConfig?.MINIO_SECRET_KEY,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = error.errors
        .map((err) => `${err.path.join('.')}: ${err.message}`)
        .join(', ');
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
  jwt: {
    JWT_ACCESS_TOKEN_SECRET: validatedEnv.JWT_ACCESS_TOKEN_SECRET,
    JWT_ACCESS_TOKEN_EXPIRE: validatedEnv.JWT_ACCESS_TOKEN_EXPIRE,
    JWT_REFRESH_TOKEN_SECRET: validatedEnv.JWT_REFRESH_TOKEN_SECRET,
    JWT_REFRESH_TOKEN_EXPIRE: validatedEnv.JWT_REFRESH_TOKEN_EXPIRE,
    JWT_RESET_PASSWORD_SECRET: validatedEnv.JWT_RESET_PASSWORD_SECRET,
    JWT_RESET_PASSWORD_EXPIRE: validatedEnv.JWT_RESET_PASSWORD_EXPIRE,
  },
  auth: {
    RESET_CODE_EXPIRE: validatedEnv.RESET_CODE_EXPIRE,
    SALT_ROUNDS: validatedEnv.SALT_ROUNDS,
  },
  minio: {
    endPoint: validatedEnv.MINIO_ENDPOINT,
    minioExternalEndpoint: validatedEnv.MINIO_EXTERNAL_ENDPOINT,
    port: validatedEnv.MINIO_PORT,
    useSSL: validatedEnv.MINIO_USE_SSL,
    accessKey: validatedEnv.MINIO_ACCESS_KEY,
    secretKey: validatedEnv.MINIO_SECRET_KEY,
  },
};

export default (): AppConfiguration => {
  return env;
};

export function validateEnvConfig() {
  validateEnv();
}
