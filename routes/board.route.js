const Router = require('express');
const boardController = require('../controller/board.controller');
const boardRouter = new Router();

boardRouter.get('/boards', boardController.getBoards);
boardRouter.post('/create', boardController.createBoard);
boardRouter.get('/board/tasks/:boardId', boardController.getBoardTasks);
boardRouter.get('/boards/:boardId', boardController.getBoardById);

module.exports = boardRouter;