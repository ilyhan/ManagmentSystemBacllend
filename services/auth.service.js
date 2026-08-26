const jwt = require('jsonwebtoken');
const { secret } = require('../config');
const bcrypt = require('bcryptjs');
const db = require('../db');
const USER_QUERY = require('../query/user.query');

class AuthService {
    generateAccessToken = (id, email, name, surname, role) => {
        const payload = {
            id,
            email,
            name,
            surname,
            role
        }

        return jwt.sign(payload, secret, { expiresIn: "1d" });
    }

    async createUser({ name, surname, email, password, role }) {
        const result = await db.query(USER_QUERY.getUser, [email]);

        if (result.rows.length > 0) throw new Error("Пользователь с такой почтой уже существует");

        const hashPassword = bcrypt.hashSync(password, 7);

        const newUser = await db.query(
            USER_QUERY.create,
            [name, surname, email, hashPassword]
        );

        if (newUser.rows.length > 0) {
            const roleId = await db.query(USER_QUERY.getRoleId, [role]);
            await db.query(USER_QUERY.setRole, [newUser.rows[0].id, roleId.rows[0].id]);
        }

        return newUser.rows[0];
    }

    async login({ email, password }) {
        const result = await db.query(USER_QUERY.getFullInfo, [email]);

        if (result.rows.length == 0) throw new Error("Пользователь с таким Никнеймом не найден");

        const user = result.rows[0];

        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) throw new Error("Введен неверный пароль");

        const token = this.generateAccessToken(user.id, email, user.name, user.surname, user.role);

        const { password: p, ...resUser } = user;
        return { token, user: resUser };
    }
}

module.exports = new AuthService();