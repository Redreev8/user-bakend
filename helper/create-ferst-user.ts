import bcrypt from 'bcryptjs'
import pool from '../config/prosgres'
import { createUsers } from '../controller/users/users.model'
import { sqlsKey } from '../migrations/createTable'
import { getPayloadUser } from '../controller/users/user.dto'
import { createToken } from '../controller/token/token.model'

export const nameTableUser = sqlsKey.users

const createFerstUser = async () => {
    const countUser = await pool.query(
        `
            SELECT count(*) AS exact_count FROM ${nameTableUser};
        `,
    )
    if (+countUser.rows[0].exact_count !== 0) return
    const name = process.env.USER_NAME!
    const password = process.env.USER_PASSWORD!
    const salt = await bcrypt.genSalt(10)
    const hasPassword = await bcrypt.hash(password, salt)
    const user = await createUsers(name, hasPassword)
    const token = await createToken(getPayloadUser(user))
    console.log(token)
}

export default createFerstUser
