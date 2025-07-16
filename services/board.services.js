const BOARD_QUERY = require("../query/board.query");
const db = require('../db');

class BoardService {
    async getBoards() {
        const boards = await db.query(BOARD_QUERY.get);
        return boards.rows;
    }

    async createBoard({name, description}, id) {
        const boardByName = await db.query(BOARD_QUERY.getByName, [name]);
        if(boardByName.rowCount > 0 ){
            throw new Error("Доска с таким названием уже сушествует");
        }

        const board = await db.query(BOARD_QUERY.create, [name, description, id]);
        console.log(board.rows[0]);

        if(board.rows.length == 0) {
            throw new Error("Ошибка создания доски");
        }

        return board.rows[0];
    }

    async getTasksOfBoard(id) {
        const boardTasks = await db.query(BOARD_QUERY.getTasksByBoardId, [id]);

        const result = [];

        boardTasks.rows.forEach(item => {
            const { userid, name, surname, boardid, ...task} = item;
            const tmp = {...task, board_id: boardid, assignee: {id, fullName: `${name} ${surname}`}};
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
}

module.exports = new BoardService();