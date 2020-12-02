import React from "react";
import { observer } from "mobx-react-lite";
// import { enableLogging } from "mobx-logger";
import { configure } from "mobx";
import store from "./mobx-store.js";
import clsx from "clsx";
import "./index.css";

configure({
  enforceActions: "always",
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
  observableRequiresReaction: false,
  disableErrorBoundaries: true,
});

const NewTodo = () => {
  const [newTitle, setNewTitle] = React.useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        store.addTodo({
          title: newTitle,
          id: Math.random(),
          finished: false,
        });
        setNewTitle("");
      }}
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

const TodoView = observer(({ todo }) => {
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
            // onChange={todoList.todo.toggle}
            onChange={() => {
              store.toggle(todo.id);
            }}
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

const TodosCount = observer(() => {
  return <h3>Mobx: UnFinished todos count: {store.unfinished}</h3>;
});

// observer(function TodosCount() {
//   return <h3>Mobx: UnFinished todos count: {list.unfinished}</h3>;
// });

const AppV1Mobx = observer(() => {
  return (
    <>
      <TodosCount />
      <NewTodo />
      <TodoListView todoList={store} /> {/* count={list.unfinished} */}
    </>
  );
});

export default AppV1Mobx;
