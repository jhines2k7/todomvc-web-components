import './todomvc-list-item'
import './todomvc-app-toggle-label'
import postal from 'postal/lib/postal.lodash'
import reduce from '../reducer'
import EventLog from '../eventLog'

class TodoMvcTodoList extends HTMLElement {
    constructor() {
        super();

        this.eventLog = new EventLog();
        this.subscribe('app-msg-bus', 'app.todo.created');
        this.subscribe('app-msg-bus', 'app.todos.loaded');
        this.subscribe('app-msg-bus', 'app.todo.deleted');
        this.subscribe('app-msg-bus', 'app.todo.toggle-all-complete');
    }

    connectedCallback() {
        this.innerHTML = `
            <!-- This section should be hidden by default and shown when there are todos -->
            <section class="main">
                <input class="toggle-all" type="checkbox">
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

                if(state.todos.length > 0) {
                    const todoList = document.querySelector('section.main ul');

                    state.todos.forEach(todo => {
                        const todoListItem = document.createElement('todomvc-list-item');
                        todoListItem.item = todo;

                        todoList.appendChild(todoListItem);
                    });

                    const todoListToggleAll = document.createElement('todomvc-toggle-all');

                    todoList.parentNode.insertBefore(todoListToggleAll, todoList);
                }
            }
        });
    };

    set todos(todos) {
        if(todos.length > 0) {
            const todoList = document.querySelector('section.main ul');

            todos.forEach(todo => {
                const todoListItem = document.createElement('todomvc-list-item');
                todoListItem.item = todo;

                todoList.appendChild(todoListItem);
            });

            const todoListToggleAll = document.createElement('todomvc-toggle-all');

            todoList.parentNode.insertBefore(todoListToggleAll, todoList);
        }
    }
}

customElements.define('todomvc-todo-list', TodoMvcTodoList);