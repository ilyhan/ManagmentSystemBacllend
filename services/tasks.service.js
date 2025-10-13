const db = require('../db');
const TASKS_QUERY = require('../query/tasks.query');

class TasksService {
    taskDecorator(item) {
        const { name, surname, userid: id, boardname, ...task } = item;

        return ({ 
            ...task, 
            boardName: boardname, 
            assignee: { 
                id: id, 
                fullName: `${name} ${surname}` 
            } 
        });
    }

    async getAllTasks() {
        const tasks = await db.query(TASKS_QUERY.getAll);

        const result = [];
        if (tasks.rows) {
            tasks.rows.forEach(item => {
                result.push(this.taskDecorator(item));
            });
        }
        return result;
    }

    async getTaskById(id) {
        const task = await db.query(TASKS_QUERY.getById, [id]);

        // if (task.rows.length == 0) {
        //     throw new Error('Задача не найдена');
        // }

        return this.taskDecorator(task.rows[0]);
    }

    async createTask({ title, description, board_id, priority, status, assignee_id }) {
        const task = await db.query(
            TASKS_QUERY.create,
            [title, description, board_id, priority, status, assignee_id]
        );

        if (task.rowCount == 0) {
            throw new Error('Ошибка при создании');
        }

        return task.rows[0];
    }

    async updateTask({ title, description, priority, status, assignee_id }, id) {
        const task = await db.query(
            TASKS_QUERY.update,
            [title, description, priority, status, assignee_id, id]
        );

        if (task.rowCount == 0) {
            throw new Error('Ошибка при обновлнии задачи');
        }

        return task.rows[0];
    }
}

module.exports = new TasksService();