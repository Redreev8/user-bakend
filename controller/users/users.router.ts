import { Router } from 'express'
import {
    register,
    login,
    logut,
    getUsers,
    putChangeRoleUser,
} from './users.controller'
import { body } from 'express-validator'
import checkActionRole from '../../middleware/check-action-role'

const router = Router()

router.get('/users/', [checkActionRole(['auth-token'])], getUsers)

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

router.put(
    '/user/change-role/',
    [
        body('idUser').isInt(),
        body('newRoleId').isInt(),
        checkActionRole(['auth-token']),
    ],
    putChangeRoleUser,
)

router.post('/logut/', [checkActionRole(['auth-token'])], logut)

export default router
