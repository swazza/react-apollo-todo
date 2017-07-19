import { PubSub } from "graphql-subscriptions";

let todoItems = [
  { id: "1", name: "Buy Vegetables" },
  { id: "2", name: "Pay the maid" },
  { id: "3", name: "Make Wife Happy" }
];

const pubsub = new PubSub();

const queryResolvers = {
  todoItems: () => todoItems
};

const mutationResolvers = {
  createTodo: (obj, args, context, info) => {
    let id = todoItems.length + 1,
      { name } = args,
      newTodo = { id, name };

    todoItems = [...todoItems, newTodo];
    pubsub.publish("todoAdded", { todoAdded: { ...newTodo } });
    return { ...newTodo };
  }
};

const subscriptionResolvers = {
  todoAdded: {
    subscribe: () => pubsub.asyncIterator("todoAdded")
  }
};

export const resolvers = {
  Query: { ...queryResolvers },
  Mutation: { ...mutationResolvers },
  Subscription: { ...subscriptionResolvers }
};
