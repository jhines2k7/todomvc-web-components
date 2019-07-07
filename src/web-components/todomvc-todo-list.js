import './todomvc-list-item';

class TodoMvcTodoList extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render([]);
    }

    set todos(todos) {
        this.render(todos);
    }

    render(todos) {
        this.innerHTML = `
            <!-- This section should be hidden by default and shown when there are todos -->
            <section class="main">
                <input class="toggle-all" type="checkbox">
                <label for="toggle-all">Mark all as complete</label>
                <ul class="todo-list">
                    <todomvc-list-item></todomvc-list-item>
                    <todomvc-list-item></todomvc-list-item>
                </ul>
            </section>
        `;
    }
}

customElements.define('todomvc-todo-list', TodoMvcTodoList);