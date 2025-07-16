
const TASKS_QUERY = {
    getAll:
        `SELECT t.*,
         u.name,
         u.surname,
         u.id as userId,
         b.name as boardName
         FROM tasks t
         JOIN users u ON t.assignee_id = u.id
         JOIN board b ON b.id = t.board_id
        `,

    getById:
        `SELECT t.*,
         u.name,
         u.surname,
         u.id as userId,
         b.name as boardName
         FROM tasks t
         JOIN users u ON t.assignee_id = u.id
         JOIN board b ON b.id = t.board_id
         WHERE t.id = $1
        `,

    create:
        `INSERT INTO tasks
         (title, description, board_id, priority, status, assignee_id)
         values($1, $2, $3, $4, $5, $6)
         RETURNING *
        `,

    update: 
        `UPDATE tasks 
         SET 
           title = $1,
           description = $2,
           priority = $3,
           status = $4,
           assignee_id = $5,
           updated_at = NOW()
         WHERE id = $6
         RETURNING *
        `,
}

module.exports = TASKS_QUERY;