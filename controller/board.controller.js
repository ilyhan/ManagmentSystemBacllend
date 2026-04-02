const boardServices = require("../services/board.services");
class BoardController {
    async getBoards(req, res) {
        try {
            const { id } = req.user;
            const boards = await boardServices.getBoards(id);
            return res.status(201).json(boards);
        } catch (e) {
            return res.status(500).json({ error: "Произошла ошибка получения данных", message: e.message });
        }
    }

    async createBoard(req, res) {
        try {
            const { id } = req.user;
            const board = await boardServices.createBoard(req.body, id);
            return res.status(201).json(board);
        } catch (e) {
            return res.status(500).json({ error: "Произошла ошибка получения данных", message: e.message });
        }
    }

    async getBoardTasks(req, res) {
        try {
            const { boardId } = req.params;
            const boardTasks = await boardServices.getTasksOfBoard(boardId);
            return res.status(201).json(boardTasks);
        } catch (e) {
            return res.status(500).json({ error: "Произошла ошибка получения данных", message: e.message });
        }
    }

    async getBoardById(req, res) {
        try {
            const { boardId } = req.params;
            const board = await boardServices.getById(boardId);
            return res.status(201).json(board);
        } catch (e) {
            return res.status(500).json({ error: "Произошла ошибка получения данных", message: e.message });
        }
    }

    async getBoardUsers(req, res) {
        try {
            const { boardId } = req.params;
            const board = await boardServices.getUsers(boardId);
            return res.status(201).json(board);
        } catch (e) {
            return res.status(500).json({ error: "Произошла ошибка получения данных", message: e.message });
        }
    }

    async addBoardUsers(req, res) {
        try {
            const { boardId, users } = req.body;
            await boardServices.addUsersToBoard(boardId, users);
            return res.status(201).json(boardId);
        } catch (e) {
            return res.status(500).json({ error: "Произошла ошибка получения данных", message: e.message });
        }
    }
}

module.exports = new BoardController();