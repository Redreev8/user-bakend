import { Request, Response } from 'express'
import { createUsers, findUser } from './users.model'
import { validationResult } from 'express-validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { createToken, removeToken } from '../token/token.model'
import { getPayloadUser } from './user.dto'

export const register = async (
    req: Request,
    res: Response,
): Promise<undefined> => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json({
                message: 'Имя или пороль не валидны',
                ...errors,
            })
            return
        }
        const { name, password } = req.body
        const userCheck = await findUser(name)
        if (!userCheck) {
            res.status(400).json('Имя занято')
            return
        }
        const salt = await bcrypt.genSalt(10)
        const hasPassword = await bcrypt.hash(password, salt)
        const user = await createUsers(name, hasPassword)
        const token = await createToken(getPayloadUser(user))
        res.json(token)
        return
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Что пошло не так', erors: e })
    }
}

export const login = async (
    req: Request,
    res: Response,
): Promise<undefined> => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json({
                message: 'Имя или пороль не валидны',
                ...errors,
            })
            return
        }
        const { name, password } = req.body
        const user = await findUser(name)
        if (!user) {
            res.status(401).json('Имя или пороль не верны')
            return
        }
        const validPass = await bcrypt.compare(password, user.password)
        if (!validPass) {
            res.status(401).json('Имя или пороль не верны')
            return
        }
        const token = await createToken(user)
        res.json(token)
        return
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Что пошло не так', erors: e })
    }
}

export const logut = async (
    req: Request,
    res: Response,
): Promise<undefined> => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json({
                message: 'Не передан токен',
                ...errors,
            })
            return
        }
        const token = req.get('auth-token')
        const user = jwt.decode(token!)
        if (!user) {
            res.status(400).json({
                message: 'Не неверный токен',
                ...errors,
            })
            return
        }
        await removeToken(token!)
        res.json()
        return
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Что пошло не так', erors: e })
    }
}
