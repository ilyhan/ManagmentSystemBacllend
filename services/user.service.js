const jwt = require('jsonwebtoken');
const { secret } = require('../config');
const bcrypt = require('bcryptjs');
const db = require('../db');
const USER_QUERY = require('../query/user.query');

class UserService {
    async getAllUsers() {
        const users = await db.query(USER_QUERY.getAll);

        const result = [];
        if(users.rows) {
            users.rows.forEach(item => {
                result.push({
                    id: item.id, 
                    fullName: `${item.name} ${item.surname}`
                });
            });
        }
        return result;
    }

    async getAllEmployees() {
        const employees = await db.query(USER_QUERY.getEmployees); 
        return employees.rows;
    }
}

module.exports = new UserService();