module.exports = (express, app) => {
    const user = require('../controllers/user.controller');
    const auth = require('../middleware/auth');
    var router = express.Router();

    router.post('/sign-up', user.signUp);

    router.post('/login', user.login);

    router.post('/logout', user.logOut);

    router.get('/coupons', auth, user.getCouponCode);

    router.post('/bookings', auth, user.bookShow );




    app.use('/api/auth', router);
}



