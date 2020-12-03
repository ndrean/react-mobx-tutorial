import React from "react";
import { observer } from "mobx-react-lite";
import { action } from "mobx";
import { configure } from "mobx";
import store from "./mobx-store.js";
import clsx from "clsx";
import "./index.css";

configure({
  enforceActions: "always",
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
  observableRequiresReaction: true,
  disableErrorBoundaries: true,
});

const NewTodo = ({ todoList }) => {
  const [newTitle, setNewTitle] = React.useState("");
  return (
    <form
      onSubmit={action((e) => {
        e.preventDefault();
        todoList.addTodo({
          title: newTitle,
          id: Math.random(),
          finished: false,
        });
        setNewTitle("");
      })}
    >
      <input
        type="text"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
      />
      <input type="submit" value="Submit" />
    </form>
  );
};

const TodoView = observer(({ todoList, todo }) => {
  const mystyle = clsx({
    ischecked: todo.finished,
    notchecked: !todo.finished,
  });
  return (
    <>
      <li>
        <label htmlFor={todo.title} className={mystyle}>
          <input
            type="checkbox"
            id={todo.title}
            defaultChecked={todo.finished}
            onChange={action(() => {
              todoList.toggle(todo.id);
            })}
          />
          {todo.title}
        </label>
      </li>
    </>
  );
});

const TodoListView = observer(({ todoList }) => {
  return (
    <ul>
      {todoList.todos &&
        todoList.todos.map((todo) => (
          <TodoView todo={todo} key={todo.id} todoList={todoList} />
        ))}
    </ul>
  );
});

const TodosCount = observer(({ todoList }) => {
  return <h3>Mobx: UnFinished todos count: {todoList.unfinished}</h3>;
});

const AppV1Mobx = () => {
  return (
    <>
      <TodosCount todoList={store} />
      <NewTodo todoList={store} />
      <TodoListView todoList={store} />
    </>
  );
};

export default AppV1Mobx;
