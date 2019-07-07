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
                   
                    <li>
                        <div class="view">
                            <input class="toggle" type="checkbox">
                            <label>Buy a unicorn</label>
                            <button class="destroy"></button>
                        </div>
                        <input class="edit" value="Rule the web">
                    </li>
                </ul>
            </section>
        `;
    }
}

customElements.define('todomvc-todo-list', TodoMvcTodoList);