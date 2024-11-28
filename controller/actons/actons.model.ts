import pool from '../../config/prosgres'
import { sqlsKey } from '../../migrations/createTable'

export const nameTableActions = sqlsKey.actions

export interface Actions {
    id: string
    action: string
}

export const findActions = async (): Promise<Actions[]> => {
    const result = await pool.query(
        `SELECT * FROM ${nameTableActions}`,
    )
    return result.rows
}

export const findAction = async (id: string): Promise<Actions> => {
    const result = await pool.query(
        `SELECT * FROM ${nameTableActions} 
        WHERE id=$1`,
        [id],
    )
    return result.rows[0]
}

export const createAction = async (
    action: string,
): Promise<Actions> => {
    const result = await pool.query<Actions>(
        `INSERT INTO ${nameTableActions}(action) 
        VALUES ($1) RETURNING *`,
        [action],
    )
    return result.rows[0]
}

export const changeAction = async (
    id: string,
    action: string
): Promise<Actions> => {
    const result = await pool.query<Actions>(
        `UPDATE ${nameTableActions}
        SET action = $1
        WHERE id = $2
        RETURNING *`,
        [action, id],
    )
    return result.rows[0]
}

export const removeAction = async (
    id: string,
): Promise<Actions> => {
    const result = await pool.query<Actions>(
        `DELETE FROM ${nameTableActions} 
        WHERE id=$1 RETURNING *`,
        [id], 
    )
    return result.rows[0]
}