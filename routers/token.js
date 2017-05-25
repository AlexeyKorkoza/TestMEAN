var jwt = require("express-jwt");
var config = require("../config");

function getTokenFromHeader(req) {

    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === "Token") {
        console.log(req.headers.authorization.split(' ')[1]);
        return req.headers.authorization.split(' ')[1];
    }

    return null;

}

var token = {
  required: jwt({
    secret: config.get('secret'),
    userProperty: 'payload',
    getToken: getTokenFromHeader
  })
};

module.exports = token;