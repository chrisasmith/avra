const config = {
  BASE: {
    DEBUG: false,
  },

  TEST: {
    ENV: 'TEST',
  },

  PRODUCTION: {
    API_SERVER: 'https://server',
    ENV: 'PRODUCTION',
  },

  BETA: {
    API_SERVER: 'https://beta-server',
    ENV: 'BETA',
  },

  DEVELOPMENT: {
    DEBUG: true,
    API_SERVER: 'http://localhost:5000',
    ENV: 'DEVELOPMENT',
  },
}

let configuration = { ...config.BASE }
switch (process.env.CONFIG_ENV) {
  case 'production':
    configuration = { ...configuration, ...config.PRODUCTION }
    break

  case 'beta':
    configuration = { ...configuration, ...config.BETA }
    break

  case 'test':
    configuration = { ...configuration, ...config.TEST }
    break

  default:
    configuration = { ...configuration, ...config.DEVELOPMENT }
}

const ENV_CONFIG = configuration
export default ENV_CONFIG
