import pool from '../../config/prosgres'
import { sqlsKey } from '../../migrations/createTable'
import { nameTableRole } from '../role/role.model'

export const nameTableRoleActions = sqlsKey['role_actions']

export interface RoleActions {
    role_id: number
    action_id: number
}

export const findActionsRole = async (idRole: number) => {
    const { rows } = await pool.query<{ action: string }>(
        `SELECT
            a.action
        FROM ${nameTableRoleActions} ra
        LEFT JOIN ${nameTableRole} as r ON ra.role_id = r.id
        LEFT JOIN actions a ON ra.action_id = a.id
        WHERE role_id = $1`,
        [idRole],
    )

    return rows.map((r) => r.action)
}

// `WITH newUser as (
//     INSERT INTO ${nameTableUser}(name, password)
//     VALUES ($1, $2, #$)
//     RETURNING  *
// ) SELECT
//     u.id, u.name, r.name as role,  array_agg(a.action) as actions
// FROM newUser u
// LEFT JOIN roles r ON r.id = u.role_id
// LEFT JOIN role_actions ra ON ra.role_id = r.id
// LEFT JOIN actions a ON ra.action_id = a.id
// GROUP BY u.id, u.name, r.name;
// `,

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
        `,
    )
    await pool.query(`DELETE FROM ${nameTableRoleActions}
    WHERE action_id NOT IN (${actions.join(',')}) AND role_id=${id};`)
    return ''
}
