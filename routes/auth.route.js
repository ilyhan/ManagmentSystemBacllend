const Router = require('express');
const authRouter = new Router();
const { check } = require('express-validator');
const authController = require('../controller/auth.controller');

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
authRouter.get('/refresh', ()=>{});

module.exports = authRouter;