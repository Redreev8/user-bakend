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

router.get('/roles/', [checkActionRole], getRoles)
router.get('/roles/:id', [queryId, checkActionRole], getRole)

router.post('/roles/', [bodyName, checkActionRole], postRole)
router.patch('/roles/:id', [queryId, bodyName, checkActionRole], patchRole)

router.delete('/roles/:id', [queryId, checkActionRole], deleteRole)

export default router
