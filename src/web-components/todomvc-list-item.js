class TodoMvcListItem extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render({});
    }

    set todo(todo) {
        this.render(todo);
    }

    render(todo) {
        this.innerHTML = `
            <!-- These are here just to show the structure of the list items -->
            <!-- List items should get the class \`editing\` when editing and \`completed\` when marked as completed -->
            <li class="completed">
                <div class="view">
                    <input class="toggle" type="checkbox" checked>
                    <label>Taste JavaScript</label>
                    <button class="destroy"></button>
                </div>
                <input class="edit" value="Create a TodoMVC template">
            </li>
        `;
    }
}

customElements.define('todomvc-list-item', TodoMvcListItem);