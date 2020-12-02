import React from "react";
import { useLocalStore, useObserver } from "mobx-react";
import { action } from "mobx";
import clsx from "clsx";

const initTodos = [
  { id: Math.random(), title: "first", finished: false },
  { id: Math.random(), title: "Second", finished: true },
  { id: Math.random(), title: "Third", finished: false },
];

const StoreContext = React.createContext();

function StoreProvider({ children }) {
  const store = useLocalStore(() => ({
    todos: initTodos,
    addTodo: action((todo) => {
      store.todos.push(todo);
    }),
    get count() {
      return store.todos.filter((todo) => todo.finished === false).length;
    },
  }));
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
}

function UnfinishedTodosCount() {
  const store = React.useContext(StoreContext);
  return useObserver(() => (
    <h3>Mobx useObserver: UnFinished todos count: {store.count}</h3>
  ));
}

function TodoListView2() {
  const store = React.useContext(StoreContext);
  return useObserver(() => (
    <ul>
      {store.todos &&
        store.todos.map((todo) => <TodoView2 key={todo.id} todo={todo} />)}
    </ul>
  ));
}

function TodoView2({ todo }) {
  console.log(todo.finished);
  const [style, setStyle] = React.useState(
    clsx({ notchecked: !todo.finished, ischecked: todo.finished })
  );
  const store = React.useContext(StoreContext);

  function toggle() {
    const foundId = store.todos.findIndex((t) => t.id === todo.id);
    store.todos[foundId].finished = !store.todos[foundId].finished;
    setStyle(clsx({ notchecked: !todo.finished, ischecked: todo.finished }));
  }

  return (
    <>
      <li>
        <label htmlFor={todo.title} className={style}>
          <input
            type="checkbox"
            id={todo.title}
            defaultChecked={todo.finished}
            onChange={toggle}
          />
          {todo.title}
        </label>
      </li>
    </>
  );
}

function NewTodo() {
  const store = React.useContext(StoreContext);
  const [todo, setTodo] = React.useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        store.addTodo({ title: todo, id: Math.random(), finished: false });
        setTodo("");
      }}
    >
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

function AppV2MobxUseCtx() {
  return (
    <StoreProvider>
      <NewTodo />
      <TodoListView2 />
      <UnfinishedTodosCount />
    </StoreProvider>
  );
}

export default AppV2MobxUseCtx;
