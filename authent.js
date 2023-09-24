function isConnected(session, userType) {
    return session && session.user && session.user.userType === userType;
}

function requireAdmin(req, res, next) {
    if (req.session && req.session.userType === 'admin') {
        return next(); // Autoriser l'accès à l'admin
    } else {
        res.status(403).send('Accès refusé'); // Interdire l'accès aux autres
    }
}

function requireUser(req, res, next) {
    if (req.session && req.session.userType === 'user') {
        return next(); // Autoriser l'accès à l'utilisateur
    } else {
        res.status(403).send('Accès refusé'); // Interdire l'accès aux autres
    }
}

function setGlobalUser() {
    app.use(function(req, res, next) {
        res.locals.userType = req.session.userType;
        next();
    });
}