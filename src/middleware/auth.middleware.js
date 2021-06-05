const SessionModel = require("../model/session");

module.exports = {
    async authRequired(req, res, next) {
        const {savedSession} = req.signedCookies;

        if (!savedSession){
            return res.redirect('auth/login');
        }

        const session = await SessionModel.findById(savedSession.sessionId);

        if (session.lock !== savedSession.lock){
            return res.redirect('/auth/login');
        }

        return next();
    },

    async authNotRequired(req, res, next){
        const {savedSession} = req.signedCookies;

        if (savedSession) {
            return res.redirect('/');
        }

        return next();
    }
}