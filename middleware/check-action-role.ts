import { Request, Response, NextFunction } from 'express'
import { findPayloadToken, findToken } from '../controller/token/token.model'
interface Payload {
    actions: string[]
}
const checkTokenAction = (payload: Payload, url: string) => {
    if (!payload.actions) return
    return payload.actions.includes(url) || payload.actions.includes('ALL')
}

const checkActionRole = (
    nameTokens: string[],
): ((req: Request, res: Response, next: NextFunction) => void) => {
    return async (req, res, next) => {
        const request = `${req.method} ${req.path}`
        for (let i = 0; i < nameTokens.length; i++) {
            const token = req.get(nameTokens[i])
            if (!token) continue
            const isTokenRedis = await findToken(token)
            if (!isTokenRedis) continue
            const payload = await findPayloadToken(token)
            if (!payload) continue
            if (checkTokenAction(payload as Payload, request)) {
                next()
                return
            }
        }
        res.status(400).json({ message: 'Ошибка токена' })
        return
    }
}

export default checkActionRole
