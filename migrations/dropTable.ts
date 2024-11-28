import pool from '../config/prosgres'
import { sqls } from './createTable'

const createUsersTable = async () => {
    const sqlsKeyReverse = Object.keys(sqls).reverse()
    pool.query('SELECT NOW()', async (err, res) => {
        if (err) {
            console.error('Error connecting to the database', err.stack)
            return
        }
        console.log('Connected to the database:', res.rows)
        for (const key of sqlsKeyReverse) {
            const res = await pool.query(`
                select exists (select *
                from information_schema.tables
                where table_name = '${key}' 
                    and table_schema = 'public')::int as "column"
            `)  
            if (res.rows[0].column === 0) continue
            await pool.query(`DROP TABLE ${key}`)
            console.log(`drop ${key}`); 
        }
    })
}

createUsersTable()
