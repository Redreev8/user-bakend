import { Router } from 'express'
import { register, login, logut } from './users.controller'
import { body } from 'express-validator'
import { headerToken } from '../token/token.router'

const router = Router()

router.post(
    '/register/',
    [
        body('name', '').isString().isLength({ min: 2, max: 50 }),
        body('password', '').isString().isLength({ min: 2, max: 255 }),
    ],
    register,
)

router.post(
    '/login/',
    [
        body('name', '').isString().isLength({ min: 2, max: 50 }),
        body('password', '').isString().isLength({ min: 2, max: 255 }),
    ],
    login,
)

router.post('/logut/', [headerToken], logut)

export default router
