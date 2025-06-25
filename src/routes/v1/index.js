const express = require('express');
const router = express.Router();
const { create, SignIn, isAuthenticated, isAdmin } = require('../../controllers/user-controller');
const { AuthRequestValidators } = require('../../middlewares/index');

router.post('/signup', AuthRequestValidators.validateAuthRequest, create);
router.post('/signin', AuthRequestValidators.validateAuthRequest, SignIn);
router.get('/isAuthenticated', isAuthenticated);    
router.get('/isAdmin', AuthRequestValidators.validateIsAdminRequest, isAdmin);

module.exports = router;