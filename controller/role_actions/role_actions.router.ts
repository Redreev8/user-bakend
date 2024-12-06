import { Router } from 'express'
import { body, param } from 'express-validator'
import { patchRoleActions } from './role-actions.controller'
import checkActionRole from '../../middleware/check-action-role'
import { finRole } from '../role/role.model'

const router = Router()

const queryRole = param('roleId').custom(async (role) => await finRole(role))
const bodyAction = body('actions').isArray({ min: 1 })

router.put(
    '/role-actions/:roleId',
    [queryRole, bodyAction, checkActionRole],
    patchRoleActions,
)

export default router
