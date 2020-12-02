import { observable, action } from "mobx";

const store = observable({
  todos: [],
  get unfinished() {
    return this.todos.filter((todo) => todo.finished === false).length;
  },
  addTodo: action(function (todo) {
    return this.todos.push(todo);
  }),
  toggle: action((todoid) => {
    const id = store.todos.findIndex((t) => t.id === todoid);
    return (store.todos[id].finished = !store.todos[id].finished);
  }),
});

store.addTodo({ id: Math.random(), title: "first", finished: false });
store.addTodo({ id: Math.random(), title: "Second", finished: true });
store.addTodo({ id: Math.random(), title: "Third", finished: true });

export default store;
