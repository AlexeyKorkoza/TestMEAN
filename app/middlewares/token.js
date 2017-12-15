'use strict';

require('dotenv').config();
import jwt from 'express-jwt';
import jsonWebToken from 'jsonwebtoken';
import UnauthorizedError from '../errors/unauthorized';

const getTokenFromHeader = req => {

    if (req.headers.authorization) {
        const parts = req.headers.authorization.split(' ');
        if (parts.length !== 2) {
            throw new UnauthorizedError('credentials_bad_format',
                { message: 'Format is Authorization: Bearer [token]' });
        }
        const [scheme, token] = parts;
        if (scheme !== 'Bearer') {
            throw new UnauthorizedError('credentials_bad_scheme',
                { message: 'Format is Authorization: Bearer [token]' });
        }
        return token;
    }

    return null;
};

const userProperty = 'payload';

const token = {
  required: jwt({
    secret: process.env.JWT_SECRET,
    userProperty,
    getToken: getTokenFromHeader
  }),
  generateJWT(user) {
      const expiresIn = '7d';
      const payload = {
          id: user._id,
          username: user.username,
      };

      return jsonWebToken.sign(
          payload,
          process.env.JWT_SECRET,
          {expiresIn}
      );
  },
};

export default token;
