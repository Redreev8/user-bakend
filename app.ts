import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import userRouter from './controller/users/users.router'
import tokenRouter from './controller/token/token.router'
import rolesRouter from './controller/role/role.router'
import actionsRouter from './controller/actons/actons.router'
import roleActionsRouter from './controller/role_actions/role_actions.router'
import pool from './config/prosgres'
import redis from './config/redis'
import createTable from './migrations/createTable'
import createFerstUser from './helper/create-ferst-user'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cors())

app.use('/api', userRouter)
app.use('/api', tokenRouter)
app.use('/api', rolesRouter)
app.use('/api', actionsRouter)
app.use('/api', roleActionsRouter)

pool.query('SELECT NOW()', async (err, res) => {
    if (err) {
        console.error('Error connecting to the database', err.stack)
        return
    }
    await createTable()
    await createFerstUser()
    console.log('Connected to the database:', res.rows)
})

redis.on('error', (err) => console.log('Redis Client Error', err))
redis.on('connect', () => console.log('Redis Client Connected'))

redis.connect()

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
