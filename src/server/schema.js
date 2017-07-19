import { makeExecutableSchema } from "graphql-tools";
import { resolvers } from "./resolvers";

const typeDefs = `
  type Query {
    todoItems: [Todo]
  }

  type Mutation {
    createTodo(name: String): Todo
  }

  type Subscription {
    todoAdded: Todo
  }

  type Todo {
    id: ID
    name: String
  }
`;

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});
