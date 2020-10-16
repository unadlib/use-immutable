# use-immutable

A hook for creating the immutable state with mutation on React

## Usage

- Installation

```sh
yarn add use-immutable
```

- Example

```js
import React from 'react';
import { useImmutable } from 'use-immutable';

const TodoList = () => {
  const todo = useImmutable({
    text: '',
    list: [],
  });
  const updateText = (e) =>
    todo.set(() => {
      todo.state.text = e.target.value;
    });
  const addTodo = () =>
    todo.set(() => {
      todo.state.list.push(todo.state.text);
      todo.state.text = '';
    });
  return (
    <div>
      <input value={todo.state.text} onChange={updateText} />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todo.state.list.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};
```
