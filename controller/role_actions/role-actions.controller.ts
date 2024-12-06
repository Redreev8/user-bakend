import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { changeRoleActions } from './role-actions.model'

export const patchRoleActions = async (
    req: Request,
    res: Response,
): Promise<undefined> => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json({
                message: 'Не валидные даные',
                ...errors,
            })
            return
        }
        const { roleId } = req.params
        const { actions } = req.body
        const result = await changeRoleActions(roleId, actions)
        res.json(result)
        return
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Что пошло не так', erors: e })
    }
}
