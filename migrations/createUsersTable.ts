import fs from 'fs/promises'
import pool from '../config/prosgres'
import path from 'path'

const createUsersTable = async () => {
    const res = await pool.query(`
        select exists (select *
        from information_schema.tables
        where table_name = 'users' 
            and table_schema = 'public')::int as "column"
    `)
    console.log(res)

    if (res.rows[0].column !== 0) return
    const sql = await fs.readFile(
        path.join('.', 'migrations', 'create-users.sql'),
        { encoding: 'utf-8' },
    )
    await pool.query(sql)
}

export default createUsersTable
