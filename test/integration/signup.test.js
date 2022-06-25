import test from "node:test";
import {ApolloServer} from "apollo-server";
import * as fs from "fs/promises";
import * as path from "path";
import assert from "node:assert/strict";
import {Mutation} from "../../src/resolvers/index.js";
import jwt from 'jsonwebtoken';

test('sign up', async t => {
    const testServer = new ApolloServer({
        typeDefs: await fs.readFile(path.join(path.resolve(), 'docs/graphql/schema.graphql'), 'utf-8'),
        resolvers: {Mutation}
    });

    async function querySignup(input) {
        return await testServer.executeOperation({
            // language=GraphQL
            query: `
                mutation Signup($input: SignupInput!) {
                    signup(input: $input) {
                        token
                        user {
                            name
                            email
                        }
                    }
                }
            `,
            variables: {input}
        });
    }

    await t.test('should return token and user data', async t => {
        const res = await querySignup({
            email: 'seungbin0508@gmail.com',
            password: 'hello',
            name: 'SeungBin Kim',
        });

        const {errors, data: {signup: {token, user: {name, email}}}} = res;
        assert.equal(errors, undefined);
        try {
            // noinspection JSCheckFunctionSignatures
            jwt.verify(token, 'jwt-secret');
        } catch (e) {
            assert.ifError(e);
        }
        assert.equal(name, 'SeungBin Kim');
        assert.equal(email, 'seungbin0508@gmail.com');
    });

    await t.test('should fail signing up due to invalid input', async t => {
        const res = await querySignup();
        const {errors} = res;
        assert.equal(!!errors, true);
    });
});