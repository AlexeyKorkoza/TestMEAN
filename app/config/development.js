require('dotenv').config();

module.exports = {
  redis: {
      host: process.env.REDIS_HOST || '127.0.0.1',
      port: process.env.REDIS_PORT || 3679,
      ttl: process.env.REDIS_TTL || 3600,
      prefix: process.env.REDIS_PREFIX || 'session:',
  },
  mongoDB: {
      host: process.env.DB_HOST || '127.0.0.1',
      dbName: process.env.DB_NAME || 'interactive_map',
      port: process.env.DB_PORT || 27017,
  },
  jwtSecret: process.env.JWT_SECRET,
  session: {
      secret: process.env.SESSION_SECRET,
  },
  passwordAlgorithm: process.env.PASSWORD_ALGORITHM,
  algorithm: process.env.ALGORITHM
};
