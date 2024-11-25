import { validationResult } from 'express-validator'
import { findToken, createToken, findPayloadToken } from './token.model'
import { Request, Response } from 'express'

export const getCheckToken = async (
    req: Request,
    res: Response,
): Promise<undefined> => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json({ message: 'Не передан токен', ...errors })
            return
        }
        const token = req.get('token')
        const result = await findToken(token!)
        res.json(typeof result === 'string')
        return
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Что пошло не так', erors: e })
    }
}

export const getPayloadToken = async (
    req: Request,
    res: Response,
): Promise<undefined> => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json({ message: 'Не передан токен', ...errors })
            return
        }
        const token = req.get('token')
        const result = await findPayloadToken(token!)
        res.json(result)
        return
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Что пошло не так', erors: e })
    }
}

export const postCreateToken = async (
    req: Request,
    res: Response,
): Promise<undefined> => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json({ message: 'Не передан токен', ...errors })
            return
        }
        const result = await createToken(req.body)
        res.json(result)
        return
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Что пошло не так', erors: e })
    }
}
