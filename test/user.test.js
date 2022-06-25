import test from "node:test";
import {ApolloServer} from "apollo-server";
import * as fs from "fs/promises";
import * as path from "path";
import assert from "node:assert/strict";

const testServer = new ApolloServer({
    typeDefs: await fs.readFile(path.join(path.resolve(), 'docs/graphql/schema.graphql'), 'utf-8')
});

test('sign up', async t => {
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
    assert.equal(graphQLResponse.data?.user, {
        name: 'SeungBin Kim',
        email: 'seungbin0508gmail.com'
    })
});