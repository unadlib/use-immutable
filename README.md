# use-immutable

![Node CI](https://github.com/unadlib/use-immutable/workflows/Node%20CI/badge.svg)
[![npm version](https://badge.fury.io/js/use-immutable.svg)](http://badge.fury.io/js/use-immutable)

A hook for creating the immutable state with mutation on React.

## Usage

- Installation

```sh
yarn add use-immutable
```

- Example: [Demo](https://stackblitz.com/edit/use-immutable)

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
