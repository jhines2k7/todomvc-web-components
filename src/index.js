import './web-components/todomvc-app'
import './web-components/todomvc-app-footer'
import EventLog from './eventLog'
import Storage from './storage'
import reduce from "./reducer"
import './css/main.css'

window.addEventListener('load', () => {
    Storage.get().then( (events) => {
        let eventLog = new EventLog(events);

        let state = reduce(eventLog.events);

        const main = document.querySelector('main');

        const todoMvcApp = document.createElement('todomvc-app');
        main.appendChild(todoMvcApp);

        // let todos = [];

        // todos.forEach(todo => {
        //     const todoListItem = document.createElement('todomvc-list-item');
        //     todoListItem.todo = todo;
        //
        //     todoMvcTodoList.appendChild(todoMvcTodoList);
        // });

        const todoMvcAppFooter = document.createElement('todomvc-app-footer');
        main.appendChild(todoMvcAppFooter);
    });
});