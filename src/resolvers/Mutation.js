import {createToken} from "../utils/jwt.js";

export async function signup(parent, args, context, info) {
    const {input: {name, email}} = args;
    const token = createToken({name, email});
    return {
        token,
        user: {
            name,
            email
        }
    };
}

export async function login(parent, args, context, info) {
    // todo get user name from db
    // todo check if user exists
    // todo validate password
    const name = 'SeungBin Kim';

    const {input: {email, password}} = args;
    const token = createToken({name, email});
    return {
        token,
        user: {
            name,
            email
        }
    };

}