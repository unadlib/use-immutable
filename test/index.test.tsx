import React from 'react';
import { act, Simulate } from 'react-dom/test-utils';
import { unmountComponentAtNode, render } from 'react-dom';

import { useImmutable } from '../src';

let container: Element;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
});

test('base', () => {
  const TodoList = () => {
    const text = useImmutable('');
    const list = useImmutable<string[]>([]);
    const updateText = (e: any) => {
      text.set(() => {
        text.state = e.target.value;
      });
    };
    const addTodo = () => {
      text.set(() => {
        text.state = '';
      });
      list.set(() => list.state.push(text.state));
    };
    return (
      <div>
        <input value={text.state} onChange={updateText} />
        <button onClick={addTodo}>Add</button>
        <ul>
          {list.state.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    );
  };
  render(<TodoList />, container);
  expect(container.querySelector('input')!.value).toBe('');
  act(() => {
    Simulate.change(container.querySelector('input')!, {
      target: { value: 'test' },
    } as any);
  });
  expect(container.querySelector('input')?.value).toBe('test');
  act(() => {
    Simulate.click(container.querySelector('button')!, { bubbles: true });
  });
  expect(container.querySelector('input')!.value).toBe('');
  expect(container.querySelector('ul')!.textContent).toBe('test');
});
