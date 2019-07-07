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

        const todoMvcTodoList = document.createElement('todomvc-todo-list');

        const todoMvcAppFooter = document.createElement('todomvc-app-footer');

        const todoListItem1 = document.createElement('todomvc-list-item');
        todoListItem1.todo = {};

        const todoListItem2 = document.createElement('todomvc-list-item');
        todoListItem2.todo = {};

        todoMvcTodoList.appendChild(todoListItem1);
        todoMvcTodoList.appendChild(todoListItem2);

        // let todos = [];

        // todos.forEach(todo => {
        //     const todoListItem = document.createElement('todomvc-list-item');
        //     todoListItem.todo = todo;
        //
        //     todoMvcTodoList.appendChild(todoMvcTodoList);
        // });

        const todoMvcListFooter = document.createElement('todomvc-list-footer');

        todoMvcApp.appendChild(todoMvcTodoList);
        todoMvcApp.appendChild(todoMvcListFooter);

        main.appendChild(todoMvcApp);
        main.appendChild(todoMvcAppFooter);
    });
});