let todoItems = [
  { id: "1", name: "Buy Vegetables" },
  { id: "2", name: "Pay the maid" },
  { id: "3", name: "Make Wife Happy" }
];

const queryResolvers = {
  todoItems: () => todoItems
};

const mutationResolvers = {};

export const rootResolvers = { ...queryResolvers, ...mutationResolvers };
