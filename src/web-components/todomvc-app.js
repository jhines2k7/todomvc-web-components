import './todomvc-todo-list';
import './todomvc-list-footer';

class TodoMvcApp extends HTMLElement {
    constructor() {
        super();
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
    }
}

customElements.define('todomvc-app', TodoMvcApp);