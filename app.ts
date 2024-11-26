import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import userRouter from './controller/users/users.router'
import tokenRouter from './controller/token/token.router'
import pool from './config/prosgres'
import redis from './config/redis'
import createTable from './migrations/createTable'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cors())
app.use('/api', userRouter)
app.use('/api', tokenRouter)

pool.query('SELECT NOW()', async (err, res) => {
    if (err) {
        console.error('Error connecting to the database', err.stack)
        return
    }
    await createTable()
    console.log('Connected to the database:', res.rows)
})

redis.on('error', (err) => console.log('Redis Client Error', err))
redis.on('connect', () => console.log('Redis Client Connected'))

redis.connect()

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
