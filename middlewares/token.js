'use strict';

import jwt from 'express-jwt';

function getTokenFromHeader(req) {

    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token') {
        return req.headers.authorization.split(' ')[1];
    }

    return null;
}

const token = {
  required: jwt({
    secret: process.env.SECRET,
    userProperty: 'payload',
    getToken: getTokenFromHeader
  })
};

export default token;
