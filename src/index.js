import './web-components/todomvc-app';
import './web-components/todomvc-todo-list';
import './web-components/todomvc-list-item';
import EventLog from './eventLog';
import Storage from './storage'
import reduce from "./reducer";

window.addEventListener('load', () => {
    Storage.get().then( (events) => {
        let eventLog = new EventLog(events);

        let state = reduce(eventLog.events);

        const main = document.querySelector('main');

        const todoMvcApp = document.createElement('todomvc-app');

        const todoList = document.querySelector('todo-list');

        const todoListItem1 = document.createElement('todomvc-list-item');
        todoListItem1.todo = {};

        const todoListItem2 = document.createElement('todomvc-list-item');
        todoListItem2.todo = {};

        todoList.appendChild(todoListItem1);
        todoList.appendChild(todoListItem2);

        // let todos = [];

        // todos.forEach(todo => {
        //     const todoListItem = document.createElement('todomvc-list-item');
        //     todoListItem.todo = todo;
        //
        //     todoMvcTodoList.appendChild(todoMvcTodoList);
        // });

        main.appendChild(todoMvcApp);
        main.appendChild(todoMvcAppFooter);
    });
});