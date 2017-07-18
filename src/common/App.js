import React from "react";
import { gql } from "react-apollo";
import compose, { withStyles, withState, withQuery, withMutation } from "hoc";
import { homeActions } from "pods/home";

const update = (proxy, { data: { createTodo } }) => {
  const data = proxy.readQuery({ query: gql`${query}` });
  data.todoItems.push(createTodo);
  proxy.writeQuery({ query: gql`${query}`, data });
};

const _App = ({ data: { loading, todoItems }, styles, mutate, resetNewTodo, updateNewTodo, newTodo }) =>
  loading
    ? <span>Loading...</span>
    : <div className={styles.todoContainer}>
        <div className={styles.addTodoContainer}>
          <input className={styles.newTodo} value={newTodo} onChange={e => updateNewTodo(e.target.value)} />
          <div
            className={styles.addTodo}
            onClick={() => {
              mutate({ update, variables: { name: newTodo } });
              resetNewTodo();
            }}
          >
            Add
          </div>
        </div>
        {todoItems.map(todo =>
          <div key={todo.id} className={styles.todo}>
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

const mutation = `mutation createTodo($name:String) {
  createTodo(name:$name) {
    id
    name
  }
}`;

const styles = {
  todoContainer: {
    display: "flex",
    flexDirection: "column",
    border: "1px solid rgba(210, 210, 210, 0.5)",
    marginBottom: "auto",
    marginTop: "200px"
  },
  addTodoContainer: {
    display: "flex",
    flexDirection: "row"
  },
  newTodo: {
    flex: "0.8",
    height: "50px",
    border: "none",
    fontSize: "1.5em",
    textAlign: "center",
    ":focus": {
      boxShadow: "0 0 1px 1px rgba(210, 210, 210, 0.2)",
      outline: "none"
    }
  },
  addTodo: {
    flex: "0.2",
    height: "50px",
    backgroundColor: "rgba(210, 210, 210, 0.2)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    ":hover": {
      cursor: "pointer"
    }
  },
  todo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "50px",
    width: "450px",
    backgroundColor: "rgb(255, 255, 255)",
    ":nth-child(2n+1)": {
      backgroundColor: "rgba(210, 210, 210, 0.5)"
    }
  }
};

// prettier-ignore
export const App = compose(
  withStyles(styles),
  withQuery(query),
  withMutation(mutation),
  withState(
    state => ({ newTodo: state.newTodo }), homeActions
  )
)(_App);
