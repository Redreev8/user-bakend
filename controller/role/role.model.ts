import pool from '../../config/prosgres'
import { sqlsKey } from '../../migrations/createTable'

export const nameTableRole = sqlsKey.roles

export interface Role {
    id: string
    name: string
}

export const finRoles = async (): Promise<Role[]> => {
    const result = await pool.query(`SELECT * FROM ${nameTableRole}`)
    return result.rows
}

export const finRole = async (id: string): Promise<Role> => {
    const result = await pool.query(
        `SELECT * FROM ${nameTableRole} 
        WHERE id=$1`,
        [id],
    )
    return result.rows[0]
}

export const createRole = async (name: string): Promise<Role> => {
    const result = await pool.query<Role>(
        `INSERT INTO ${nameTableRole}(name) 
        VALUES ($1) RETURNING *`,
        [name],
    )
    return result.rows[0]
}

export const changeRole = async (id: string, name: string): Promise<Role> => {
    const result = await pool.query<Role>(
        `UPDATE ${nameTableRole}
        SET name = $1
        WHERE id = $2
        RETURNING *`,
        [name, id],
    )
    return result.rows[0]
}

export const removeRole = async (id: string): Promise<Role> => {
    const result = await pool.query<Role>(
        `DELETE FROM ${nameTableRole} 
        WHERE id=$1 RETURNING *`,
        [id],
    )
    return result.rows[0]
}
