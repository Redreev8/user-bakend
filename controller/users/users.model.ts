import pool from '../../config/prosgres'
import { sqlsKey } from '../../migrations/createTable'

export const nameTableUser = sqlsKey.users

export interface User {
    id: number
    name: string
    password: string
    role: string
    actions: string[]
}

export const findUser = async (name: string): Promise<User> => {
    const result = await pool.query(
        `
            SELECT 
                u.id, u.name, u.password, r.name as role,  array_agg(a.action) as actions
            FROM ${nameTableUser} u 
            LEFT JOIN roles r ON r.id = u.role_id
            LEFT JOIN role_actions ra ON ra.role_id = r.id
            LEFT JOIN actions a ON ra.action_id = a.id
            WHERE u.name = $1
            GROUP BY u.id, r.name;
        `,
        [name],
    )
    return result.rows[0]
}

export const createUsers = async (
    name: string,
    password: string,
): Promise<User> => {
    const result = await pool.query<User>(
        `WITH newUser as (
            INSERT INTO ${nameTableUser}(name, password) 
            VALUES ($1, $2) 
            RETURNING  * 
        ) SELECT 
            u.id, u.name, r.name as role,  array_agg(a.action) as actions
        FROM newUser u 
        LEFT JOIN roles r ON r.id = u.role_id
        LEFT JOIN role_actions ra ON ra.role_id = r.id
        LEFT JOIN actions a ON ra.action_id = a.id
        GROUP BY u.id, u.name, r.name;
        `,
        [name, password],
    )
    return result.rows[0]
}
