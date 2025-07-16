
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
        `
}

module.exports = USER_QUERY;