
const DOCUMENTATION_QUERY = {
    getAllSpaces:
        `SELECT *
         FROM space
         ORDER BY name
        `,

    getSpaceById:
        `SELECT *
         FROM space
         WHERE id = $1
        `,

    getSpaceByName:
        `SELECT *
         FROM space
         WHERE name = $1
        `,

    createSpace:
        `INSERT INTO space
         (name, description)
         VALUES ($1, $2)
         RETURNING *
        `,

    updateSpace:
        `UPDATE space
         SET
           name = $1,
           description = $2,
           updated_at = NOW()
         WHERE id = $3
         RETURNING *
        `,

    deleteSpace:
        `DELETE FROM space
         WHERE id = $1
         RETURNING *
        `,

    getChaptersBySpaceId:
        `SELECT *
         FROM chapter
         WHERE space_id = $1
         ORDER BY position, id
        `,

    getChapterById:
        `SELECT *
         FROM chapter
         WHERE id = $1
        `,

    createChapter:
        `INSERT INTO chapter
         (space_id, parent_id, name, content, position)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *
        `,

    updateChapter:
        `UPDATE chapter
         SET
           name = $1,
           content = $2,
           parent_id = $3,
           position = $4,
           updated_at = NOW()
         WHERE id = $5
         RETURNING *
        `,

    deleteChapter:
        `DELETE FROM chapter
         WHERE id = $1
         RETURNING *
        `
}

module.exports = DOCUMENTATION_QUERY;
