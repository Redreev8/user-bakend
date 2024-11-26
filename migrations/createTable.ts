import fs from 'fs/promises'
import pool from '../config/prosgres'
import path from 'path'

export const sqls: { [key: string]: string } = {
    'roles': 'create-role',
    'actions': 'create-actions',
    'role_actions': 'create-role-action',
    'users': 'create-users',
}

export const sqlsKey = Object.keys(sqls).reduce((obj: { [key: string]: string }, key: string) => {
    obj[key] = key
    return obj
}, {})

const createUsersTable = async () => {
    for (const key in sqls) {
        console.log(key);
        
        const res = await pool.query(`
            select exists (select *
            from information_schema.tables
            where table_name = '${key}' 
                and table_schema = 'public')::int as "column"
        `)

        if (res.rows[0].column !== 0) continue
        console.log(key);
        const comands = await fs.readFile(
            path.join('.', 'migrations', `${sqls[key]}.sql`),
            { encoding: 'utf-8' },
        )
        await pool.query(comands)
    }
}

export default createUsersTable
