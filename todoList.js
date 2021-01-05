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

  toArray() {
    return this.todos.slice();
  }

  findByTitle(title) {
    return this.filter(todo => todo.getTitle() === title).first();
  }

  allDone() {
    return this.filter(todo => todo.isDone());
  }

  allNotDone() {
    return this.filter(todo => !todo.isDone());
  }

  markDone(title) {
    let todo = this.findByTitle(title);
    if (todo !== undefined) {
      todo.markDone();
    }
  }

  markAllDone() {
    this.forEach(todo => todo.markDone());
  }

  markAllUndone() {
    this.forEach(todo => todo.markUndone());
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