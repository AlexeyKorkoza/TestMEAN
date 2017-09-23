'use strict';

import jwt from 'express-jwt';
import config from '../config';

function getTokenFromHeader(req) {

    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token') {
        return req.headers.authorization.split(' ')[1];
    }

    return null;
}

const token = {
  required: jwt({
    secret: config.get('secret'),
    userProperty: 'payload',
    getToken: getTokenFromHeader
  })
};

export default token;
