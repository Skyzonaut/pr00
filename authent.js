module.exports = {
    isConnected: function(session, userType){
        return session && session.user && session.user.userType === userType;
    },

    requireAdmin: function (req, res, next) {
        if (req.session && req.session.userType === 'admin') {
            return next(); // Autoriser l'accès à l'admin
        } else {
            res.status(403).send('Accès refusé'); // Interdire l'accès aux autres
        }
    },

    requireUser: function(req, res, next) {
        if (req.session && req.session.userType === 'user') {
            return next(); // Autoriser l'accès à l'utilisateur
        } else {
            res.status(403).send('Accès refusé'); // Interdire l'accès aux autres
        }
    },

    setGlobalUser: function () {
        app.use(function (req, res, next) {
            res.locals.userType = req.session.userType;
            next();
        });
    }
}