const Router = require('express');
const userRouter = new Router();
const userController = require('../controller/user.controller');

userRouter.get('/users', userController.allUsers);

module.exports = userRouter;