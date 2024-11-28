import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { changeRole, createRole, finRole, finRoles, removeRole } from './role.model'


export const getRoles = async (req: Request, res: Response): Promise<undefined> => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json({
                message: 'Не валидные даные',
                ...errors,
            })
            return
        }
        const roles = await finRoles()
        res.json(roles)
        return
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Что пошло не так', erors: e })
    }
}
export const getRole = async (req: Request, res: Response): Promise<undefined> => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json({
                message: 'Не валидные даные',
                ...errors,
            })
            return
        }
        const { id } = req.params
        const role = await finRole(id)
        res.json(role)
        return
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Что пошло не так', erors: e })
    }
}
export const postRole = async (req: Request, res: Response): Promise<undefined> => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json({
                message: 'Не валидные даные',
                ...errors,
            })
            return
        }
        const { name } = req.body
        const role = await createRole(name)
        res.json(role)
        return
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Что пошло не так', erors: e })
    }
}
export const patchRole = async (req: Request, res: Response): Promise<undefined> => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json({
                message: 'Не валидные даные',
                ...errors,
            })
            return
        }
        const { id } = req.params
        const { name } = req.body
        const role = await changeRole(id, name)
        res.json(role)
        return
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Что пошло не так', erors: e })
    }
}
export const deleteRole = async (req: Request, res: Response): Promise<undefined> => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json({
                message: 'Не валидные даные',
                ...errors,
            })
            return
        }
        const { id } = req.params
        const role = await removeRole(id)
        res.json(role)
        return
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Что пошло не так', erors: e })
    }
}