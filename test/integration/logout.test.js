import test from "node:test";
import {ApolloServer} from "apollo-server";
import fs from "fs/promises";
import path from "path";
import {Mutation} from "../../src/resolvers";
import createInMemoryConnection from "../../src/utils/inMemoryDB.js";


await test("logout", async t => {
    const client = await createInMemoryConnection();
    const testServer = new ApolloServer({
        typeDefs: await fs.readFile(path.join(path.resolve(), "docs/graphql/schema.graphql"), "utf-8"),
        resolvers: {Mutation},
        context: async () => ({
            client
        })
    });
});