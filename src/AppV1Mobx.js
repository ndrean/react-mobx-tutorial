import React from "react";
import { observer } from "mobx-react-lite";

// import { configure, observable, action } from "mobx";

import list from "./mobx-store.js";
import clsx from "clsx";
import "./index.css";

// configure({
//   enforceActions: "always",
//   computedRequiresReaction: true,
//   reactionRequiresObservable: true,
//   observableRequiresReaction: true,
//   disableErrorBoundaries: true,
// });
/*
const list = observable({
  todos: [],
  get unfinished() {
    return this.todos.filter((todo) => todo.finished === false).length;
  },
  addTodo: action(function (todo) {
    return this.todos.push(todo);
  }),
});
*/

const NewTodo = observer(() => {
  const [newElt, setNewElt] = React.useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        list.addTodo({ title: newElt, id: Math.random(), finished: false });
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
});

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
            onChange={() => (todo.finished = !todo.finished)}
          />
          {todo.title}
        </label>
      </li>
    </>
  );
});

const TodoListView = observer(({ todoList }) => {
  return (
    <div>
      <NewTodo />
      <ul>
        {todoList.todos &&
          todoList.todos.map((todo) => <TodoView todo={todo} key={todo.id} />)}
      </ul>
      {/* <h3>Mobx: UnFinished todos count: {!todoList ? 0 : count}</h3> */}
    </div>
  );
});

const TodosCount = observer(() => {
  return <h3>Mobx: UnFinished todos count: {list.unfinished}</h3>;
});

// observer(function TodosCount() {
//   return <h3>Mobx: UnFinished todos count: {list.unfinished}</h3>;
// });

const AppV1Mobx = observer(() => {
  return (
    <>
      <TodosCount />
      <TodoListView todoList={list} /> {/* count={list.unfinished} */}
    </>
  );
});

export default AppV1Mobx;
