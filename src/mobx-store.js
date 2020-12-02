import { observer } from "mobx-react-lite";
import { observable, action } from "mobx";

const list = observable({
  todos: [],
  get unfinished() {
    return this.todos.filter((todo) => todo.finished === false).length;
  },
  addTodo: action(function (todo) {
    return this.todos.push(todo);
  }),
});

list.addTodo({ id: Math.random(), title: "first", finished: false });
list.addTodo({ id: Math.random(), title: "Second", finished: true });
list.addTodo({ id: Math.random(), title: "Third", finished: true });

export default list;
