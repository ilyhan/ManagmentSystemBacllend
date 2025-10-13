const Router = require('express');
const authRouter = new Router();
const { check } = require('express-validator');
const authController = require('../controller/auth.controller');
const authorization = require('../middlewares/authorization');

authRouter.post('/registration',[
    check('name', "Имя пользователя не может быть пусто").notEmpty(),
    check('surname', "Фамилия пользователя не может быть пуста").notEmpty(),
    check('email', "Некорректные данные в поле почта").isEmail(),
    check('password', "Пароль должен быть больше 5 и меньше 15 символов").isLength({ min: 5, max: 15 }),
], authController.createUser);
authRouter.post('/login',[
    check('email', "Почта пользователя не может быть пуста").notEmpty().isEmail(),
    check('password', "Пароль должен быть больше 5 и меньше 15 символов").isLength({ min: 5, max: 15 }),
], authController.login);
authRouter.get('/refresh',authorization, (req, res)=>{return res.status(201).json(req.user)});

module.exports = authRouter;