# use-immutable

A hook for creating the immutable state with mutation on React

## Usage

- Installation

```sh
yarn add use-immutable
```

- Example

```js
import React from "react";
import { useImmutable } from "use-immutable";

const TodoList = () => {
  const text = useImmutable('');
  const list = useImmutable([]);
  const updateText = e => text.set(() => test.state = e.target.value);
  const addTodo = () => list.set(() => list.add(test.state));
  return (
    <div>
      <input value={text.state} onChange={updateText} />
      <button onClick={addTodo}>Add<button/>
      <ul>
        {list.state.map((item, index) => <li key={key}>{item}<li/>)}
      <ul/>
    </div>
  )
}
```
