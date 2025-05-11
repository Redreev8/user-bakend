import { Request, Response, NextFunction } from 'express'
import { findPayloadToken, findToken } from '../controller/token/token.model'
import { findActionsRole } from '../controller/role_actions/role-actions.model'
interface Payload {
    role_id: number
}
const checkTokenAction = async (payload: Payload, url: string) => {
    if (!payload.role_id) return
    const actions = await findActionsRole(payload.role_id)
    return actions.includes(url) || actions.includes('ALL')
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
            console.log(isTokenRedis)
            if (!isTokenRedis) continue
            const payload = await findPayloadToken(token)
            if (!payload) continue
            if (await checkTokenAction(payload as Payload, request)) {
                next()
                return
            }
        }
        res.status(400).json({ message: 'Ошибка токена' })
        return
    }
}

export default checkActionRole
