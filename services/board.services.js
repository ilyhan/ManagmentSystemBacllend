const BOARD_QUERY = require("../query/board.query");
const db = require('../db');

class BoardService {
    async getBoards(userId) {
        const boards = await db.query(BOARD_QUERY.get, [userId]);
        return boards.rows;
    }

    async createBoard({ name, name_id, description }, id) {
        const boardByName = await db.query(BOARD_QUERY.getByName, [name]);
        if (boardByName.rowCount > 0) {
            throw new Error("Доска с таким названием уже сушествует");
        }

        const board = await db.query(BOARD_QUERY.create, [name, name_id, description, id]);

        if (board.rows.length == 0) {
            throw new Error("Ошибка создания доски");
        }

        return board.rows[0];
    }

    async getTasksOfBoard(id) {
        const boardTasks = await db.query(BOARD_QUERY.getTasksByBoardId, [id]);

        const board = await db.query(BOARD_QUERY.getById, [id]);
        const boardNaming = board?.rows[0]?.name_id ?? '';

        const result = [];

        boardTasks.rows.forEach(item => {
            const { userid, name, surname, boardid, current_id, ...task } = item;
            const current_name = boardNaming && current_id ? `${boardNaming}-${current_id}` : '';

            const tmp = { ...task, current_name, board_id: boardid, assignee: { id, fullName: `${name} ${surname}` } };
            result.push(tmp);
        });

        return result;
    }

    async getById(id) {
        const board = await db.query(BOARD_QUERY.getById, [id]);
        // if(board.rowCount == 0) {
        //     throw new Error("Доска не существует");
        // }

        return board.rows[0];
    }

    async getUsers(boardId) {
        const users = await db.query(BOARD_QUERY.getUsers, [boardId]);

        const result = [];
        if (users.rows) {
            users.rows.forEach(item => {
                result.push({
                    id: item.id,
                    fullName: `${item.name} ${item.surname}`
                });
            });
        }
        return result;
    }

    async addUsersToBoard(boardId, users) {
        const placholder = users.length != 0
            ? users.map((_, index) => {
                return `($${index * 2 + 1}, $${index * 2 + 2})`;
            }).join(', ')
            : null;

        if (placholder == null) return;

        const userBoard = users.flatMap((user) => {
            return [boardId, user.id];
        });

        const add = db.query(`INSERT INTO board_users (board_id, user_id) VALUES ${placholder}`, userBoard);
    }
}

module.exports = new BoardService();