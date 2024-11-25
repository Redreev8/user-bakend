import pool from '../../config/prosgres'

export const nameTableProducts = 'users'

export interface User {
    id: number
    name: string
    password: string
}

export const findUser = async (name: string): Promise<User> => {
    const result = await pool.query(
        `SELECT * FROM ${nameTableProducts} 
        WHERE name=$1`,
        [name],
    )
    return result.rows[0]
}

export const createUsers = async (
    name: string,
    password: string,
): Promise<User> => {
    const result = await pool.query<User>(
        `
        INSERT INTO ${nameTableProducts}(name, password) 
        VALUES ($1, $2) RETURNING *`,
        [name, password],
    )
    return result.rows[0]
}
