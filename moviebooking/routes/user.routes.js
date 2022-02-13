module.exports = (express, app) => {
    const user = require('../controllers/user.controller');
    // const auth = require('../middleware/auth');
    var router = express.Router();

    router.post('/signup', user.signUp);

    router.post('/login', user.login);

    router.post('/logout', user.logOut);

    router.get('/coupons', user.getCouponCode);

    router.post('/bookings',user.bookShow );




    app.use('/api/auth', router);
}



