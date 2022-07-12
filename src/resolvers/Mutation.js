import {createToken} from "../utils/jwt.js";
import {createMember, findMember} from "../user/db.js";
import hashPassword from "../utils/hashPasssword.js";
import {UserInputError} from "apollo-server";

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
        console.error(e);
        return e;
    }
}

export async function login(parent, args, context, info) {
    // todo get user name from db
    // todo check if user exists
    // todo validate password
    try {
        const {input: {email, password}} = args;
        const filter = {email};
        const member = await findMember(context, filter);
        const {password: savedPassword, salt} = member;
        const {hash: hashedPassword} = hashPassword(password, salt);
        if (hashedPassword !== savedPassword) {
            return new UserInputError("잘못된 비밀번호입니다.");
        }

        const {name} = member;
        console.log(savedPassword, hashedPassword);
        const token = createToken({name, email});
        return {
            token,
            user: {
                name,
                email
            }
        };
    } catch (e) {
        console.error(e);
        return e;
    }

}