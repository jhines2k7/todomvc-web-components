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

        if(event.topic === 'app.todo.status-changed') {
            state.todos = state.todos.map((todo) => {
               if(event.data.id === todo.id) {
                   todo.status = event.data.status;
               }
            });
        }

        if(event.topic === 'app.todo.deleted') {
            state.todos = state.todos.filter(todo => todo.id !== event.data.id);
        }

        if(event.topic === 'app.todo.toggle-all-complete') {
            state.todos = state.todos.map((todo) => {
                if(todo.status === 'completed') {
                    todo.status = '';
                } else {
                    todo.status = 'completed';
                }

                return todo;
            });
        }

        return state;
    }, {
        todos: [],
        filter: 'all'
    })
}