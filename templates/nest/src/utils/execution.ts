export type Execution = 'prod' | 'dev';

export const execution = process.env.NODE_ENV;

export const isDev = execution === 'dev';

export const isProd = execution !== 'dev';
