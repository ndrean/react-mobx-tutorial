import React from "react";
import clsx from "clsx";
import "./index.css";
import initList from "./pl-store.js";

const RTodoView = ({ todo, onhandleToggle }) => {
  const mystyle = clsx({
    ischecked: todo.finished,
    notchecked: !todo.finished,
  });
  return (
    <li>
      <label htmlFor={todo.title} className={mystyle}>
        <input
          type="checkbox"
          id={todo.title}
          defaultChecked={todo.finished}
          onChange={() => onhandleToggle(todo.id)}
        />
        {todo.title}
      </label>
    </li>
  );
};

const RTodoListView = ({ todoList, handleToggle, handleAddTodo }) => {
  return (
    <div>
      <RNewTodo onhandleAddTodo={handleAddTodo} />
      <ul>
        {todoList &&
          todoList.map((todo) => (
            <RTodoView
              todo={todo}
              key={todo.id}
              onhandleToggle={handleToggle}
            />
          ))}
      </ul>
      {/* <h5>UnFinished todos count: {count}</h5> */}
    </div>
  );
};
function RNewTodo({ onhandleAddTodo }) {
  const [newElt, setNewElt] = React.useState("");
  console.log(newElt);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onhandleAddTodo({ title: newElt, id: Math.random(), finished: false });
        setNewElt("");
      }}
    >
      <input
        type="text"
        value={newElt}
        onChange={(e) => setNewElt(e.target.value)}
      />
      <input type="submit" value="Submit" />
    </form>
  );
}

const RTodosCount = ({ count }) => {
  return <h3>State lift: UnFinished todos count: {count}</h3>;
};

const AppReact = React.memo(() => {
  const [todos, setTodos] = React.useState(initList);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    setCount(todos.filter((todo) => todo.finished === false).length);
  }, [todos]);

  function toggle(id) {
    setTodos((previous) => {
      return previous.map((todo) => {
        if (todo.id === id) return { ...todo, finished: !todo.finished };
        return todo;
      });
    });
  }

  // const foundId = previous.findIndex((todo) => todo.id === id);
  // const todoAtFoundId = previous[foundId];
  // const newTodos = [...previous];
  // newTodos[foundId] = {
  //   ...todoAtFoundId,
  //   finished: !todoAtFoundId.finished,
  // };
  // return newTodos;

  function addTodo(todo) {
    setTodos((previous) => [...previous, todo]);
  }

  return (
    <div style={{ display: "inline-block", padding: "5px", minWidth: "400px" }}>
      <RTodosCount count={count} />
      <RTodoListView
        todoList={todos}
        handleToggle={toggle}
        handleAddTodo={addTodo}
      />
    </div>
  );
});

export default AppReact;
