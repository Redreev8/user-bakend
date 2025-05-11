import pool from '../../config/prosgres'
import { sqlsKey } from '../../migrations/createTable'

export const nameTableUser = sqlsKey.users

export interface User {
    id: number
    name: string
    password: string
    role_id?: number
    role?: string
    actions?: string[]
}

export const findUsers = async () => {
    const result = await pool.query(
        `
            SELECT 
               *
            FROM ${nameTableUser} 
        `,
        [],
    )
    return result.rows
}

export const findUser = async (name: string): Promise<User> => {
    const result = await pool.query(
        `
            SELECT 
                *
            FROM ${nameTableUser} u
            WHERE u.name = $1
        `,
        [name],
    )
    return result.rows[0]
}

export const createUsers = async (
    name: string,
    password: string,
    role: number = 1,
): Promise<User> => {
    const result = await pool.query<User>(
        `WITH newUser as (
            INSERT INTO ${nameTableUser}(name, password, role_id) 
            VALUES ($1, $2, $3) 
            RETURNING  * 
        ) SELECT 
           *
        FROM newUser u 
        `,
        [name, password, role],
    )
    return result.rows[0]
}

export const changeRoleUser = async (idUser: number, newRoleId: number) => {
    const result = await pool.query<User>(
        `UPDATE ${nameTableUser}
            SET role_id = $1
            WHERE id = $2
            RETURNING *`,
        [newRoleId, idUser],
    )
    return result.rows[0]
}
