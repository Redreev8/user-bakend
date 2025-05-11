import { User } from './users.model'

export const getPayloadUser = ({ id, name, role_id }: User) => ({
    id,
    name,
    role_id,
})
