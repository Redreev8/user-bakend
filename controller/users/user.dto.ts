import { User } from './users.model'

export const getPayloadUser = ({ id, name, actions, role }: User) => ({
    id,
    name,
    role,
    actions,
})
