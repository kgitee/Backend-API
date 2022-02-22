const { Router } = require('express');
const userController = require('../controllers/user');
const router = Router();
const auth = require('../middleware/auth');

router.post('/register', userController.signup);
router.post('/login', userController.login);
router.get('/user', auth, userController.get_user);

module.exports = router;