/* eslint-disable max-lines-per-function */
const Todo = require('./todo');
const TodoList = require('./todolist');

describe('TodoList', () => {
  let todo1;
  let todo2;
  let todo3;
  let list;

  beforeEach(() => {
    todo1 = new Todo('Buy milk');
    todo2 = new Todo('Clean room');
    todo3 = new Todo('Go to the gym');

    list = new TodoList("Today's Todos");
    list.add(todo1);
    list.add(todo2);
    list.add(todo3);
  });

  test('todolist has a size of 3', () => {
    expect(list.size()).toBe(3);
  });

  test('toArray returns a list in array form', () => {
    expect(list.toArray()).toEqual([todo1, todo2, todo3]);
  });

  test('first() returns the first element of the list', () => {
    expect(list.first()).toEqual(todo1);
  });

  test('last() returns the last element of the list', () => {
    expect(list.last()).toEqual(todo3);
  });

  test('shift() removes and returns the first item in the list', () => {
    let todoRemoved = list.shift();
    expect(todoRemoved).toEqual(todo1);
    expect(list.toArray()).toEqual([todo2, todo3]);
  });

  test('pop() removes and returns the last element in the list', () => {
    let todoRemoved = list.pop();
    expect(todoRemoved).toEqual(todo3);
    expect(list.toArray()).toEqual([todo1, todo2]);
  });

  test('isDone() returns true when all items are done, false otherwise', () => {
    list.markDoneAt(0);
    expect(list.isDone()).toBe(false);
    list.markAllDone();
    expect(list.isDone()).toBe(true);
  });

  test('add() throws TypeError if the item added is not a Todo object', () => {
    expect(() => list.add({data: 'something'})).toThrow(TypeError);
    expect(() => list.add('hi')).toThrow(TypeError);
    expect(() => list.add(new TodoList())).toThrow(TypeError);
  });

  test('itemAt() returns the item at the given index', () => {
    expect(list.itemAt(1)).toEqual(todo2);
    expect(() => list.itemAt(5)).toThrow(ReferenceError);
  });

  test('markDoneAt() mark an item as done at a given index', () => {
    list.markDoneAt(1);
    expect(todo1.isDone()).toBe(false);
    expect(todo2.isDone()).toBe(true);
    expect(todo3.isDone()).toBe(false);
    expect(() => list.markDoneAt(8)).toThrow(ReferenceError);
  });

  test('markUndoneAt() mark an item as not done at a given index', () => {
    list.markAllDone();
    list.markUndoneAt(1);
    expect(todo1.isDone()).toBe(true);
    expect(todo2.isDone()).toBe(false);
    expect(todo3.isDone()).toBe(true);
    expect(() => list.markUndoneAt(8)).toThrow(ReferenceError);
  });

  test('markAllDone() marks all items as done', () => {
    list.markAllDone();
    expect(list.isDone()).toBe(true);
  });

  test('removeAt() removes and returns an element as an array at a given index', () => {
    let removedItem = list.removeAt(1);
    expect(removedItem).toEqual([todo2]);
    expect(list.toArray()).toEqual([todo1, todo3]);
  });
// 14. toString
});