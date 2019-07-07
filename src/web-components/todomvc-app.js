import './todomvc-todo-list';
import './todomvc-list-footer';
import EventLog from '../eventLog';

class TodoMvcApp extends HTMLElement {
    constructor() {
        super();

        this.eventLog = new EventLog();
    }

    connectedCallback() {
        this.innerHTML = `
            <section class="todoapp">
                <header class="header">
                    <h1>todos</h1>
                    <input class="new-todo" placeholder="What needs to be done?" autofocus>
                </header>
                <todomvc-todo-list></todomvc-todo-list>
                <todomvc-list-footer></todomvc-list-footer>
            </section>
        `;

        this.querySelector('section.todoapp header input.new-todo').addEventListener('keyup', event => {
            this.createNewTodo(event);
        });
    }

    createNewTodo(event) {
        if(event.code === 'Enter') {
            let input = document.querySelector('section.todoapp header input.new-todo');

            this.eventLog.add(this.eventLog.events, [{
                channel: 'app-msg-bus',
                topic: 'app.todo.created',
                data: input.value
            }]);

            input.value = '';
        }
    }
}

customElements.define('todomvc-app', TodoMvcApp);