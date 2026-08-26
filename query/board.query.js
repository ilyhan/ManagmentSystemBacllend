
const BOARD_QUERY = {
    // get:
    //     `SELECT b.* 
    //      FROM board b
    //      JOIN board_users bu ON bu.board_id = b.id
    //      WHERE bu.user_id = $1
    //     `,

    get:
        `SELECT DISTINCT b.*
         FROM board b
         LEFT JOIN board_users bu ON bu.board_id = b.id
         WHERE b.created_by = $1 OR bu.user_id = $1
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
         (name, name_id, description, created_by)
         VALUES ($1, $2, $3, $4)
         RETURNING *
        `,

    getUsers:
        `SELECT u.id, 
         u.name,
         u.surname
         FROM board_users bu 
         JOIN users u ON u.id = bu.user_id
         WHERE bu.board_id = $1
        `
}

module.exports = BOARD_QUERY;