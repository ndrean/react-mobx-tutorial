# Article on dev.to

<https://dev.to/ndrean/a-comparison-of-state-management-in-react-with-mobx-vs-state-lifting-54l4>

## Change an object attribute inside an array of objects

```js
const [todos, setTodos] = React.useState(initList);

function toggle(id) {
    setTodos((previous) => {
      return previous.map((todo) => {
        if (todo.id === id) return { ...todo, finished: !todo.finished };
        return todo;
      });
    });

```
