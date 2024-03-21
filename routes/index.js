const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');

router.get("/api/users", auth.authenticate(), userController.getAllUsers);
router.get('api/users', userController.getAllUsers);
router.post('api/users', userController.createUser);
router.put('api/users/:nombre', userController.updateUser);
router.delete('api/users/:nombre', userController.deleteUser);
router.post('/register', userController.register);
router.post('/login', userController.login);

module.exports = router;


