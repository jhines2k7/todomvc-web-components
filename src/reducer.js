export default function reduce(events) {
    "use strict";

    return events.reduce( (state, event) => {
        if(event.topic === 'app.todo.created') {
            state.todos.push({
                label: event.data,
                status: '',
                editing: false
            });
        }

        if(event.topic === 'app.filter.changed') {
            state.filter = event.data;
        }

        return state;
    }, {
        todos: [],
        filter: 'all'
    })
}