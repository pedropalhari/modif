import { ApolloServer } from "apollo-server";
import { GraphQLSchema } from "graphql";
import { initGraphQL } from "./graphql";

async function run() {
  const schema = initGraphQL() as unknown as GraphQLSchema;

  const server = new ApolloServer({
    schema,
  });

  const { url } = await server.listen(6780);

  console.log(`Server listening at ${url}`);
}

run();
