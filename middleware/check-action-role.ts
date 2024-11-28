import { Request, Response, NextFunction } from 'express'
import { findPayloadToken } from '../controller/token/token.model'
import { User } from '../controller/users/users.model'

const checkTokenAction = (
    payload: User | string[] | string | null,
    url: string,
) => {
    if (!payload) return
    if (typeof payload === 'string') {
        return payload === url || payload === 'ALL'
    }
    if (Array.isArray(payload)) {
        return payload.includes(url) || payload.includes('ALL')
    }
    return payload.actions.includes(url) || payload.actions.includes('ALL')
}

const checkActionRole = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<any> => {
    console.log(req)
    const authToken = req.get('auth-token')
    const token = req.get('token')
    const payloaAuth = authToken ? await findPayloadToken(authToken) : null
    const payload = token ? await findPayloadToken(token) : null
    const request = `${req.method} ${req.path}`
    if (
        checkTokenAction(payloaAuth as string, request) ||
        checkTokenAction(payload as string, request)
    ) {
        next()
        return
    }
    res.status(400).json({ message: 'Ошибка токена' })
    return
}

export default checkActionRole
