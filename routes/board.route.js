const Router = require('express');
const boardController = require('../controller/board.controller');
const authorization = require('../middlewares/authorization');
const boardRouter = new Router();

boardRouter.get('/boards', authorization, boardController.getBoards);
boardRouter.post('/create', authorization, boardController.createBoard);
boardRouter.get('/board/tasks/:boardId', authorization, boardController.getBoardTasks);
boardRouter.get('/boards/:boardId', authorization, boardController.getBoardById);
boardRouter.get('/board/users/:boardId', authorization, boardController.getBoardUsers);
boardRouter.post('/board/add/users', authorization, boardController.addBoardUsers);

module.exports = boardRouter;