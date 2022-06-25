import test from "node:test";
import {ApolloServer} from "apollo-server";
import * as fs from "fs/promises";
import * as path from "path";
import assert from "node:assert/strict";
import {Mutation} from "../src/resolvers/index.js";

const testServer = new ApolloServer({
    typeDefs: await fs.readFile(path.join(path.resolve(), 'docs/graphql/schema.graphql'), 'utf-8'),
    resolvers: {Mutation}
});

test('sign up', async t => {
    await t.test('should return name and email', async t => {
        const graphQLResponse = await testServer.executeOperation({
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
            variables: {
                input: {
                    email: 'seungbin0508@gmail.com',
                    password: 'hello',
                    name: 'SeungBin Kim',
                }
            }
        });
        const {errors, data: {signup: {user: {name, email}}}} = graphQLResponse;
        assert.equal(errors, undefined);
        assert.equal(name, 'SeungBin Kim');
        assert.equal(email, 'seungbin0508@gmail.com');
    });

    await t.test('should fail signing up due to invalid input', async t => {
        const graphQLResponse = await testServer.executeOperation({
            // language=GraphQL
            query: `
                mutation InvalidSignup($input: SignupInput!) {
                    signup(input: $input) {
                        token
                        user {
                            name
                            email
                        }
                    }
                }
            `,
            variables: {
                input: {

                }
            }
        });

        const {errors} = graphQLResponse;
        assert.equal(!!errors, true)
    })
});