import {createToken} from "../utils/jwt.js";
import {createMember, findMember} from "../user/db.js";

export async function signup(parent, args, ctx, info) {
    const {input, input: {name, email}} = args;
    const token = createToken({name, email});

    try {
        const _id = await createMember(ctx, input);
        const filter = {_id};
        const member = await findMember(ctx, filter);
        return {
            token,
            user: {...member}
        };
    } catch (e) {
        throw e;
    }
}

export async function login(parent, args, context, info) {
    // todo get user name from db
    // todo check if user exists
    // todo validate password
    const name = "SeungBin Kim";

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