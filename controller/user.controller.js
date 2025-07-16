const userService = require("../services/user.service");

class UserController {
    async allUsers(_, res) {
        try {
            const users = await userService.getAllUsers();
            return res.status(201).json(users);
        } catch (e) {
            return res.status(500).json({ error: "Произошла ошибка получения данных", message: e.message });
        }
    }
}

module.exports = new UserController();