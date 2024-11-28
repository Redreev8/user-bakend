import { Router } from 'express'
import { body, param } from 'express-validator'
import { getActions, getAction, postAction, patchAction, deleteAction } from './actions.controller'
import checkActionRole from '../../middleware/check-action-role'

const router = Router()

const queryId = param('id').isInt({ min: 1 })
const bodyAction = body('action', '').isString().isLength({ min: 2, max: 100 })

router.get(
    '/actions/', [checkActionRole], getActions,
)
router.get(
    '/actions/:id', [
        queryId,
        checkActionRole
    ], 
    getAction,
)
router.post(
    '/actions/',
    [
        bodyAction,
        checkActionRole
    ],
    postAction,
)
router.patch(
    '/actions/:id',
    [
        queryId,
        bodyAction,
        checkActionRole
    ],
    patchAction,
)
router.delete(
    '/actions/:id', 
    [
        queryId,
        checkActionRole
    ], 
    deleteAction
)

export default router
