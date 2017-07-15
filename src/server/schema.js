import { buildSchema } from "graphql";

export const schema = buildSchema(`
  type Query {
    todoItems: [Todo]
  }

  type Todo {
    id: ID
    name: String
  }
`);
