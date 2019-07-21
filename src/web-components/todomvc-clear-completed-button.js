import EventLog from '../eventLog'
import postal from 'postal/lib/postal.lodash'
import reduce from '../reducer'

class TodoMvcClearCompletedButton extends HTMLElement {
    constructor() {
        super();

        this.eventLog = new EventLog();
    }

    connectedCallback() {
        let state = reduce(this.eventLog.events);

        let anyCompletedItems = state.todos.find(todo => todo.status === 'completed');

        this.render(anyCompletedItems);
    }

    clearCompleted(event) {

    }

    render(anyCompletedItems) {
        if(typeof anyCompletedItems !== 'undefined') {
            this.innerHTML = `
                <!-- Hidden if no completed items are left ↓ -->
                <button class="clear-completed">Clear completed</button>
            `;

            this.querySelector('button.clear-completed').addEventListener('click', event => {
                this.clearCompleted(event);
            });
        }
    }
}

customElements.define('todomvc-clear-completed', TodoMvcClearCompletedButton);