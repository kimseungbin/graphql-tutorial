export async function signup (parent, args, context, info) {
    const {input: {name, email}} = args;
    return {
        token: '12345',
        user: {
            _id: '1',
            name,
            email
        }
    }
}