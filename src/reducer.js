export default function reduce(events) {
    "use strict";

    return events.reduce( (state, event) => {
        if(event.topic === 'app.todo.created') {
            state.todos.push({
                id: event.data.id,
                label: event.data.label,
                status: '',
                editing: false
            });
        }

        if(event.topic === 'app.filter.changed') {
            state.filter = event.data;
        }

        if(event.topic === 'app.todo.status-change') {
            state.todos.map((todo) => {
               if(event.data.id === todo.id) {
                   todo.status = event.data.status;
               }
            });
        }

        return state;
    }, {
        todos: [],
        filter: 'all'
    })
}