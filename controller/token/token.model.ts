import jwt from 'jsonwebtoken'
import redis from '../../config/redis'

export const findToken = async (token: string) => {
    const dateLifeToken = await redis.get(token)
    if (!dateLifeToken) return null
    return dateLifeToken
}

export const findPayloadToken = async (token: string) => {
    return jwt.decode(token)
}

export const createToken = async (payload: any = '') => {
    const token = jwt.sign(payload, process.env.JWT_SECRET!)

    await redis.set(token, payload)
    await redis.expire(token, 30 * 24 * 60 * 60)

    return token
}
