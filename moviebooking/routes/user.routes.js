module.exports = (express, app) => {
    const user = require('../controllers/user.controller');
    var router = express.Router();

    router.post('/sign-up', user.signUp);

    router.post('/login', user.login);

    router.post('/logout', user.logOut);




    app.use('/app', router);
}



