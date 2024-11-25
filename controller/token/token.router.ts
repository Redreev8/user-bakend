import { Router } from 'express'
import {
    getCheckToken,
    getPayloadToken,
    postCreateToken,
} from './token.controller'
import { header } from 'express-validator'
import isCheckToken from '../../middleware/is-check-token.middleware'

const router = Router()

export const headerToken = header('auth-token')
    .isString()
    .isLength({ min: 100, max: 170 })

router.get('/check-token/', [headerToken], getCheckToken)
router.get('/token-payload/', [headerToken, isCheckToken], getPayloadToken)
router.post('/token/', [headerToken, isCheckToken], postCreateToken)

export default router
