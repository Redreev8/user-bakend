import { Router } from 'express'
import {
    getCheckToken,
    getPayloadToken,
    postCreateToken,
} from './token.controller'
import { header } from 'express-validator'
import checkActionRole from '../../middleware/check-action-role'

const router = Router()

export const headerToken = header('token').isString().isLength({ min: 70 })

router.get('/check-token/', [headerToken], getCheckToken)
router.get('/token-payload/', [headerToken, checkActionRole(['auth-token','token'])], getPayloadToken)
router.post('/token/', [headerToken, checkActionRole(['auth-token','token'])], postCreateToken)

export default router
