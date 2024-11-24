import jwt from 'jsonwebtoken'

export const generateToken = ({id}:{id:any}) => {
    return jwt.sign({id},'TOKEN',{ expiresIn: '12d' })
}