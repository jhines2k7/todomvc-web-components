import './todomvc-todo-list';
import './todomvc-list-footer';
import EventLog from '../eventLog';
import postal from 'postal/lib/postal.lodash'
import reduce from '../reducer'

class TodoMvcApp extends HTMLElement {
    constructor() {
        super();

        this.eventLog = new EventLog();

        this.subscribe('app-msg-bus', 'app.todos.loaded');
        this.subscribe('app-msg-bus', 'app.todo.deleted');
        this.subscribe('app-msg-bus', 'app.todo.created');
        this.subscribe('app-msg-bus', 'app.todo.toggle-all-complete');
    }

    connectedCallback() {
        let state = reduce(this.eventLog.events);

        this.render(state.todos.length);
    }

    uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
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
            input.focus();
        }
    }

    subscribe(channel, topic) {
        return postal.subscribe({
            channel: channel,
            topic: topic,
            callback: (data, envelope) => {
                let state = reduce(this.eventLog.events);

                this.render(state.todos.length);
            }
        });
    };

    render(numTodos) {
        this.innerHTML = `
            <section class="todoapp">
                <header class="header">
                    <h1>todos</h1>
                    <input class="new-todo" placeholder="What needs to be done?" autofocus>
                </header>
                <todomvc-todo-list></todomvc-todo-list>
            </section>
        `;

        this.querySelector('section.todoapp header input.new-todo').addEventListener('keyup', event => {
            this.createNewTodo(event);
        });

        if(numTodos > 0) {
            document.querySelector('section.todoapp').appendChild(document.createElement('todomvc-list-footer'));
        } else if(document.getElementsByTagName('todomvc-list-footer').length > 0) {
            document.querySelector('section.todoapp').removeChild(document.getElementsByTagName('todomvc-list-footer')[0]);
        }
    }
}

customElements.define('todomvc-app', TodoMvcApp);