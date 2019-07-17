import EventLog from "../eventLog";

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
        this.eventLog.add(this.eventLog.events, [{
            channel: 'app-msg-bus',
            topic: 'app.todo.toggle-all-complete',
            data: {}
        }]);
    }
}

customElements.define('todomvc-toggle-all', TodoMvcToggleLabel);