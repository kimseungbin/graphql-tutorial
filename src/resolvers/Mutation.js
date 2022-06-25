import {createToken} from "../utils/jwt.js";

export async function signup (parent, args, context, info) {
    const {input: {name, email}} = args;
    const token = createToken({name, email})
    return {
        token,
        user: {
            _id: '1',
            name,
            email
        }
    }
}