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

    uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    createNewTodo(event) {
        if(event.code === 'Enter') {
            let uuid = this.uuidv4();

            let input = document.querySelector('section.todoapp header input.new-todo');

            this.eventLog.add(this.eventLog.events, [{
                channel: 'app-msg-bus',
                topic: 'app.todo.created',
                data: {
                    id: uuid,
                    label: input.value
                }
            }]);

            input.value = '';
        }
    }
}

customElements.define('todomvc-app', TodoMvcApp);