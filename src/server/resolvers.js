let todoItems = [
  { id: "1", name: "Buy Vegetables" },
  { id: "2", name: "Pay the maid" },
  { id: "3", name: "Make Wife Happy" }
];

const queryResolvers = {
  todoItems: () => todoItems
};

const mutationResolvers = {
  createTodo: ({ name }) => {
    let id = todoItems.length + 1,
      newTodo = { id, name };

    todoItems = [...todoItems, newTodo];
    return { ...newTodo };
  }
};

export const rootResolvers = { ...queryResolvers, ...mutationResolvers };
