const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateFields');
const { validateJWT } = require('../middlewares/validateJwt');
const router = Router();

const {createUser, loginUser, revalidateToken} = require('../controllers/auth');

router.post(
    '/new', 
    [
        check('name', 'The name is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        check('password', 'The password is required').isLength({ min:6 }),
        validateFields
    ], 
    createUser
);

router.post(
    '/',
    [
        check('email', 'Email is required').isEmail(),
        check('password', 'The password is required').isLength({ min:6 }),
        validateFields
    ], 
    loginUser
);

router.get('/renew', validateJWT, revalidateToken);

module.exports = router;