
const USER_QUERY = {
    getUser:
        `SELECT email 
         FROM users 
         WHERE email = $1
        `,

    getAll:
        `SELECT name, surname, id
         FROM users
        `,

    get:
        `SELECT * 
         FROM users 
         WHERE email = $1
        `,

    getFullInfo: `
            SELECT 
                u.id,
                u.email,
                u.name,
                u.surname,
                u.password,
                r.role
            FROM 
                users u
            JOIN 
                user_roles ur ON u.id = ur.user_id
            JOIN 
                roles r ON ur.role_id = r.id
            WHERE 
                u.email = $1
            `,

    create:
        `INSERT INTO users 
         (name, surname, email, password) 
         values ($1, $2, $3, $4) 
         RETURNING *
        `,

    setRole:
        `INSERT INTO user_roles 
         (user_id, role_id)
         values ($1, $2)
         RETURNING*
        `,

    getRoleId:
        `SELECT id
         FROM roles
         WHERE role = $1
        `,

    getEmployees: `
        SELECT DISTINCT
            u.id,
            u.name,
            u.surname,
            u.email,
            CASE 
                WHEN g.level IS NULL OR g.skill IS NULL THEN NULL
                ELSE CONCAT(g.level, ' ', g.skill)
            END as grade,
            CASE 
                WHEN c.type = 'Mobile'::info_type 
                THEN c.value
                ELSE NULL
            END as phone
        FROM 
            users u
        LEFT JOIN 
            grades g ON g.user_id = u.id
        LEFT JOIN 
            extra_info c ON c.user_id = u.id AND c.type = 'Mobile'::info_type
        `
}

module.exports = USER_QUERY;