import EventLog from '../eventLog';

class TodoMvcListItem extends HTMLElement {
    constructor() {
        super();

        this.eventLog = new EventLog();
    }

    toggleTodoItemStatus(event) {
        if(this.todo.status === 'completed') {
            this.todo.status = '';
        } else if(this.todo.status === '') {
            this.todo.status = 'completed';
        }

        this.eventLog.add(this.eventLog.events, [{
            channel: 'app-msg-bus',
            topic: 'app.todo.status-change',
            data: {
                status: this.todo.status,
                id: this.todo.id
            }
        }]);

        this.render(this.todo);
    }

    set item(todo) {
        this.todo = todo;

        this.render(todo);
    }

    render(todo) {
        this.innerHTML = `
            <!-- These are here just to show the structure of the list items -->
            <!-- List items should get the class \`editing\` when editing and \`completed\` when marked as completed -->
            <li class=${todo.status === 'completed' ? 'completed' : ''}>
                <div class="view">
                    <input class="toggle" type="checkbox" ${todo.status === 'completed' ? 'checked' : ''}>
                    <label>${todo.label}</label>
                    <button class="destroy"></button>
                </div>
                <input class="edit" value="Create a TodoMVC template">
            </li>
        `;

        this.querySelector('li div.view input').addEventListener('click', event => {
            this.toggleTodoItemStatus(event);
        });
    }
}

customElements.define('todomvc-list-item', TodoMvcListItem);