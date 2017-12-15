const isLoggedIn = (req, res, next) => {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()) {
        return next();
    }

    // if they aren't redirect them to the home page
    res.redirect('/login');
};

const loadAuthUserMiddleware = userProperty => (req, res, next) => {
    if (req.user) {
        return next();
    }
    if (!req[userProperty]) {
        return next(new Error('Cannot get req.tokenInfo. Is token decoded?'));
    }
    return req._passport.instance.deserializeUser(req[userProperty].uid,
        req,
        (err, user) => {
            if (err) {
                req.log.error(err, 'Error while deserializing user from token');
                return next(err);
            }
            req.user = user;
            return next();
        });
};

export {
    isLoggedIn,
    loadAuthUserMiddleware
}
