
const BOARD_QUERY = {
    get:
        `SELECT * 
         FROM board
        `,

    getByName:
        `SELECT *
         FROM board
         WHERE name = $1 
        `,

    getById:
        `SELECT *
         FROM board
         WHERE id = $1 
        `,

    getTasksByBoardId:
        `SELECT t.*, 
         u.name,
         u.surname,
         u.id as userid,
         b.id as boardid
         FROM tasks t
         JOIN board b ON t.board_id = b.id
         LEFT JOIN users u ON t.assignee_id = u.id
         WHERE t.board_id = $1; 
        `,

    create:
        `INSERT INTO board
         (name, description, created_by)
         VALUES ($1, $2, $3)
         RETURNING *
        `,
}

module.exports = BOARD_QUERY;