import { Request, Response, NextFunction } from 'express'
import { findPayloadToken, findToken } from '../controller/token/token.model'
import { User } from '../controller/users/users.model'

const checkTokenAction = (
    payload: User | string[] | string,
    url: string,
) => {
    if (typeof payload === 'string') {
        return payload === url || payload === 'ALL'
    }
    if (Array.isArray(payload)) {
        return payload.includes(url) || payload.includes('ALL')
    }
    return payload.actions.includes(url) || payload.actions.includes('ALL')
}

const checkActionRole = (
    nameTokens: string[]
): ((req: Request, res: Response, next: NextFunction,) => void) => {
    return async (req, res, next) => {
        const request = `${req.method} ${req.path}`
        for (let i = 0; i < nameTokens.length; i++) {
            const token = req.get(nameTokens[i])
            if (!token) continue
            const isTokenRedis = await findToken(token)
            if (!isTokenRedis) continue
            const payload = token ? await findPayloadToken(token) : null
            if (!payload) continue
            if (checkTokenAction(payload as string, request)) {
                next()
                return
            }
        }
        res.status(400).json({ message: 'Ошибка токена' })
        return
    }
}

export default checkActionRole
