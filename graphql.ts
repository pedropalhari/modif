import { makeSchema } from "nexus";
import { join } from "path";
import { GraphQLModifiers } from "./graphql/GraphQLModifiers";

export function initGraphQL() {
  const schema = makeSchema({
    types: [...Object.values(GraphQLModifiers)],

    outputs: {
      typegen: join(process.cwd(), "generated", "graphql-types.d.ts"),
      schema: join(process.cwd(), "generated", "schema.graphql"),
    },
  });

  return schema;
}
