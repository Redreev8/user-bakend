import pool from '../../config/prosgres'
import { sqlsKey } from '../../migrations/createTable'

export const nameTableRoleActions = sqlsKey['role_actions']

export interface RoleActions {
    role_id: number
    action_id: number
}

export const changeRoleActions = async (
    id: string,
    actions: string[],
): Promise<string> => {
    await pool.query<RoleActions>(
        `INSERT INTO ${nameTableRoleActions} (action_id, role_id)
        SELECT t1.keyword, ${id}
        FROM (SELECT UNNEST(ARRAY[${actions.join(',')}]::int[]) as keyword) as t1
            LEFT JOIN actions as a ON a.id = t1.keyword
            LEFT JOIN role_actions as ra ON ra.action_id = t1.keyword AND ra.role_id = ${id}
            WHERE ra.action_id IS NULL AND a.id IS NOT NULL;
        `
    )
    await pool.query(`DELETE FROM ${nameTableRoleActions}
    WHERE action_id NOT IN (${actions.join(',')}) AND role_id=${id};`)
    return ''
}