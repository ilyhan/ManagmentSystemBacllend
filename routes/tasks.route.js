const Router = require('express');
const tasksController = require('../controller/tasks.controller');
const authorization = require('../middlewares/authorization');
const tasksRouter = new Router();

tasksRouter.get('/tasks', authorization, tasksController.allTasks);
tasksRouter.post('/tasks/create',authorization, tasksController.createTask);
tasksRouter.put('/tasks/update/:taskId',authorization, tasksController.updateTask);
tasksRouter.get('/tasks/:taskId',authorization, tasksController.taskById);

module.exports = tasksRouter;