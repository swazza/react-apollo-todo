import { buildSchema } from "graphql";

export const schema = buildSchema(`
  type Query {
    todoItems: [Todo]
  }

  type Mutation {
    createTodo(name: String): Todo
  }

  type Todo {
    id: ID
    name: String
  }
`);
