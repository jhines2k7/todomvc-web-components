import EventLog from "../eventLog";
import reduce from "../reducer";

class TodoMvcToggleLabel extends HTMLElement {
    constructor() {
        super();

        this.eventLog = new EventLog();
    }

    connectedCallback() {
        this.innerHTML = `
            <label for="toggle-all">Mark all as complete</label>
        `;

        this.querySelector('section.main label').addEventListener('click', event => {
            this.toggleAllComplete(event);
        });
    }

    toggleAllComplete(event) {
        let state = reduce(this.eventLog.events);

        this.eventLog.add(this.eventLog.events, [{
            channel: 'app-msg-bus',
            topic: 'app.todo.toggle-all-complete',
            data: {
                toggleAll: !state.toggleAll
            }
        }]);
    }
}

customElements.define('todomvc-toggle-all', TodoMvcToggleLabel);