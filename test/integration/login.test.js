import test from "node:test";
import {ApolloServer} from "apollo-server";
import fs from "fs/promises";
import path from "path";
import assert from "node:assert/strict";
import jwt from "jsonwebtoken";
import {Mutation} from "../../src/resolvers/index.js";

await test('login', async t => {
    const testServer = new ApolloServer({
        typeDefs: await fs.readFile(path.join(path.resolve(), 'docs/graphql/schema.graphql'), 'utf-8'),
        resolvers: {Mutation}
    });
    async function queryLogin(input) {
        return await testServer.executeOperation({
            // language=GraphQL
            query: `
                mutation Login($input: LoginInput!) {
                    login(input: $input) {
                        token
                        user {
                            name
                            email
                        }
                    }
                }
            `,
            variables: input
        });
    }

    await t.test('should return token', async () => {
        // todo insert a user into db

        const res = await queryLogin({
            email: 'seungbin0508@gmail.com',
            password: 'apple'
        });

        const {errors, data: {login: {token, user: {name, email}}}} = res
        assert.equal(errors, undefined);
        try {
            // noinspection JSCheckFunctionSignatures
            jwt.verify(token, 'jwt-secret');
        } catch (e) {
            assert.ifError(e)
        }
        assert.equal(name, 'SeungBin Kim');
        assert.equal(email, 'seungbin0508@gmail.com');
    });
});