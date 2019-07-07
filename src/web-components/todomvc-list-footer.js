import EventLog from '../eventLog'
import postal from 'postal/lib/postal.lodash'
import reduce from '../reducer'

class TodoMvcListFooter extends HTMLElement {
    constructor() {
        super();

        this.eventLog = new EventLog();
    }

    connectedCallback() {
        let state = reduce(this.eventLog.events);

        let numItemsLeft = state.todos.reduce( (itemsLeft, todo ) => {
            if(todo.status !== 'completed') {
                itemsLeft++;
            }

            return itemsLeft;
        }, 0);

        this.render(numItemsLeft);

        this.subscribe('app-msg-bus', 'app.todo.status-change');
    }

    set itemsLeft(itemsLeft) {
        this.render(itemsLeft);
    }

    subscribe(channel, topic) {
        return postal.subscribe({
            channel: channel,
            topic: topic,
            callback: (data, envelope) => {
                let state = reduce(this.eventLog.events);

                let numItemsLeft = state.todos.reduce( (itemsLeft, todo ) => {
                    if(todo.status !== 'completed') {
                        itemsLeft++;
                    }

                    return itemsLeft;
                }, 0);

                this.render(numItemsLeft);
            }
        });
    };

    render(itemsLeft) {
        this.innerHTML = `
            <footer class="footer">
                <!-- This should be \`0 items left\` by default -->
                <span class="todo-count"><strong>${itemsLeft}</strong> item${itemsLeft === 1 ? '' : 's'} left</span>
                    <!-- Remove this if you don't implement routing -->
                    <ul class="filters">
                        <li>
                            <a class="selected" href="#/">All</a>
                        </li>
                        <li>
                            <a href="#/active">Active</a>
                        </li>
                        <li>
                            <a href="#/completed">Completed</a>
                        </li>
                    </ul>
                <!-- Hidden if no completed items are left ↓ -->
                <button class="clear-completed">Clear completed</button>
            </footer>
        `;
    }
}

customElements.define('todomvc-list-footer', TodoMvcListFooter);