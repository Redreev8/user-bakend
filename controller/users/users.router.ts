import { Router } from 'express'
import { register, login } from './users.controller'
import { body } from 'express-validator'

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

export default router
