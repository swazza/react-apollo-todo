import React from "react";
import compose, { withQuery } from "hoc";

const _App = ({ data: { loading, todoItems } }) =>
  loading
    ? <span>Loading...</span>
    : <div>
        {todoItems.map(todo =>
          <div key={todo.id}>
            {todo.name}
          </div>
        )}
      </div>;

const query = `query {
  todoItems {
    id
    name
  }
}`;

// prettier-ignore
export const App = compose(
  withQuery(query)
)(_App);
