import { User } from './users.model'

export const getPayloadUser = ({ id, name }: User) => ({ id: id, name: name })
