import { Request, Response, NextFunction } from 'express'
import { findToken } from '../controller/token/token.model'

const isCheckToken = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<any> => {
    const token = req.get('auth-token')
    const isToken = await findToken(token!)

    if (isToken) return next()
    return res.status(400).json({ message: 'Не передан токен' })
}

export default isCheckToken
