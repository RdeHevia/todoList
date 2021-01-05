class Todo {
  static DONE_MARKER = 'X';
  static UNDONE_MARKER = ' ';

  constructor(title) {
    this.title = title;
    this.done = false;
  }
  // polymorphism (method override of String.prototype.toString)
  toString() {
    let marker = this.isDone() ? Todo.DONE_MARKER : Todo.UNDONE_MARKER;
    return `[${marker}] ${this.title}`;
  }

  markDone() {
    this.done = true;
  }

  markUndone() {
    this.done = false;
  }

  isDone() {
    return this.done;
  }

  getTitle() {
    return this.title;
  }
}

class TodoList {
  constructor(title) {
    this.title = title;
    this.todos = [];
  }

  add(todo) {
    if (!(todo instanceof Todo)) {
      throw new TypeError('can only add Todo objects');
    }
    this.todos.push(todo);
  }

  size() {
    return this.todos.length;
  }

  first() {
    return this.todos[0];
  }

  last() {
    return this.todos[this.todos.length - 1];
  }

  itemAt(idx) {
    this._validateIndex(idx);
    return this.todos[idx];
  }

  _validateIndex(idx) {
    if (!(this.todos.hasOwnProperty(idx))) {
      throw new ReferenceError(`invalid index: ${idx}`);
    }
  }

  markDoneAt(idx) {
    let todo = this.itemAt(idx);
    todo.markDone();
  }

  markUndoneAt(idx) {
    let todo = this.itemAt(idx);
    todo.markUndone();
  }

  isDone() {
    return this.todos.every(todo => todo.isDone());
  }

  shift() {
    return this.todos.shift();
  }

  pop() {
    return this.todos.pop();
  }

  removeAt(idx) {
    this._validateIndex(idx);
    return this.todos.splice(idx,1);
  }

  toString() {
    let header = `---- Today's Todos ----`;
    let displayText = this.todos.reduce((accumulator,todo) => {
      return accumulator + '\n' + todo.toString();
    }, header);
    return displayText;
  }

  forEach(callback) {
    this.todos.forEach(callback);
  }

  filter(callback) {
    let filteredTodos = new TodoList(this.title);
    this.forEach(todo => {
      if (callback(todo)) {
        filteredTodos.add(todo);
      }
    });

    return filteredTodos;
  }
}

let todo1 = new Todo("Buy milk");
let todo2 = new Todo("Clean room");
let todo3 = new Todo("Go to the gym");
let todo4 = new Todo("Go shopping");
let todo5 = new Todo("Feed the cats");
let todo6 = new Todo("Study for Launch School");
let list = new TodoList("Today's Todos");

list.add(todo1);
list.add(todo2);
list.add(todo3);
list.add(todo4);
list.add(todo5);
list.add(todo6);
todo1.markDone();
todo5.markDone();

console.log(list);
console.log(list.first());
let doneTodos = list.filter(todo => todo.isDone());
console.log(doneTodos);
let test = list.filter(todo => todo.isDone()).first();
console.log(test);