import * as Joi from 'joi';

export interface AmoCrmConfig {
  longLifeToken: string;
  url: string;
}

export interface AppConfig {
  amocrm: AmoCrmConfig;
  port: number;
}

export default () => ({
  amocrm: {
    longLifeToken: process.env.AMOCRM_LONG_LIFE_TOKEN,
    url: process.env.AMOCRM_URL,
  },
  port: process.env.PORT,
});

export const validationSchema = Joi.object({
  AMOCRM_LONG_LIFE_TOKEN: Joi.string().required(),
  AMOCRM_URL: Joi.string().required(),
  PORT: Joi.number().required(),
});
