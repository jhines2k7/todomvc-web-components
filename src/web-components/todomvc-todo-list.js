import './todomvc-list-item';
import postal from 'postal/lib/postal.lodash'
import reduce from '../reducer'
import EventLog from '../eventLog'

class TodoMvcTodoList extends HTMLElement {
    constructor() {
        super();

        this.eventLog = new EventLog();
        this.subscribe('app-msg-bus', 'app.todo.created');
        this.subscribe('app-msg-bus', 'app.todos.loaded');
    }

    connectedCallback() {
        this.innerHTML = `
            <!-- This section should be hidden by default and shown when there are todos -->
            <section class="main">
                <input class="toggle-all" type="checkbox">
                <label for="toggle-all">Mark all as complete</label>
                <ul class="todo-list"></ul>
            </section>
        `;
    }

    subscribe(channel, topic) {
        return postal.subscribe({
            channel: channel,
            topic: topic,
            callback: (data, envelope) => {
                let todoList = document.querySelector('section.main ul');

                while (todoList.firstChild) {
                    todoList.removeChild(todoList.firstChild);
                }

                let state = reduce(this.eventLog.events);

                state.todos.forEach(todo => {
                    todoList = document.querySelector('section.main ul');

                    const todoListItem = document.createElement('todomvc-list-item');
                    todoListItem.todo = todo;

                    todoList.appendChild(todoListItem);
                });
            }
        });
    };

    set todos(todos) {
        todos.forEach(todo => {
            const todoList = document.querySelector('section.main ul');

            const todoListItem = document.createElement('todomvc-list-item');
            todoListItem.todo = todo;

            todoList.appendChild(todoListItem);
        });
    }
}

customElements.define('todomvc-todo-list', TodoMvcTodoList);