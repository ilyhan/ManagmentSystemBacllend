const Router = require('express');
const userRouter = new Router();
const userController = require('../controller/user.controller');
const authorization = require('../middlewares/authorization');

userRouter.get('/users', authorization, userController.allUsers);
userRouter.get('/employees', userController.getEmployees);

module.exports = userRouter;