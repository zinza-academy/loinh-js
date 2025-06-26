import * as dotenv from 'dotenv';
import * as Joi from 'joi';

const envConfig = dotenv.config().parsed!;

interface DatabaseIF {
  DATABASE_URL: string;
}

export interface AppConfiguration {
  frontendUrl: string;
  database: DatabaseIF;
}
export const env: AppConfiguration = {
  frontendUrl: envConfig.FRONTEND_URL,
  database: {
    DATABASE_URL: envConfig?.DATABASE_URL,
  },
  
};

const validationSchema = Joi.object({
  database: {
    DATABASE_URL: Joi.string().required(),
  },
  frontendUrl: Joi.string().required(),
});

export default (): AppConfiguration => {
  return env;
};

export function validateEnv() {
  const { error } = validationSchema.validate(env);
  if (error) {
    throw new Error(error.message);
  }
}