const tasksService = require("../services/tasks.service");

class TasksController {
    async allTasks(_, res) {
        try {
            const tasks = await tasksService.getAllTasks();
            return res.status(201).json(tasks);
        } catch (e) {
            return res.status(500).json({ error: "Произошла ошибка получения данных", message: e.message });
        }
    }

    async taskById(req, res) {
        try {
            const { taskId } = req.params;
            const task = await tasksService.getTaskById(taskId);
            return res.status(201).json(task);
        } catch (e) {
            return res.status(500).json({ error: "Произошла ошибка получения данных", message: e.message });
        }
    }

    async createTask(req, res) {
        try {
            const task = await tasksService.createTask(req.body);
            return res.status(201).json(task);
        } catch (e) {
            return res.status(500).json({ error: "Произошла ошибка получения данных", message: e.message });
        }
    }

    async updateTask(req, res) {
        try {
            const { taskId } = req.params;
            const task = await tasksService.updateTask(req.body, taskId);
            return res.status(201).json(task);
        } catch (e) {
            return res.status(500).json({ error: "Произошла ошибка получения данных", message: e.message });
        }
    }
}

module.exports = new TasksController();