import jwt from 'jsonwebtoken'
import redis from '../../config/redis'

export const findToken = async (token: string) => {
    if (!token) return
    const dateLifeToken = await redis.get(token)
    if (!dateLifeToken && typeof dateLifeToken !== 'string') return null
    return dateLifeToken
}

export const findPayloadToken = async (token: string) => {
    return jwt.decode(token)
}

export const createToken = async (payload: any = '') => {
    const token = jwt.sign(payload, process.env.JWT_SECRET!)

    await redis.set(token, 'token')
    await redis.expire(token, 30 * 24 * 60 * 60)

    return token
}

export const removeToken = async (token: string) => {
    const res = await redis.del(token)

    return res
}
