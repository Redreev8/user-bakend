import { Router } from 'express'
import { body, param } from 'express-validator'
import {
    deleteRole,
    getRole,
    getRoles,
    patchRole,
    postRole,
} from './role.controller'
import checkActionRole from '../../middleware/check-action-role'

const router = Router()

const queryId = param('id').isInt({ min: 1 })
const bodyName = body('name', '').isString().isLength({ min: 2, max: 50 })

router.get('/roles/', [checkActionRole(['auth-token','token'])], getRoles)
router.get('/roles/:id', [queryId, checkActionRole(['auth-token','token'])], getRole)

router.post('/roles/', [bodyName, checkActionRole(['auth-token','token'])], postRole)
router.patch('/roles/:id', [queryId, bodyName, checkActionRole(['auth-token','token'])], patchRole)

router.delete('/roles/:id', [queryId, checkActionRole(['auth-token','token'])], deleteRole)

export default router
