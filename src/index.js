import './web-components/todomvc-app'
import './web-components/todomvc-app-footer'
import EventLog from './eventLog'
import Storage from './storage'
import './css/main.css'

window.addEventListener('load', () => {
    Storage.get().then( (events) => {
        let eventLog = new EventLog(events);

        const main = document.querySelector('main');

        const todoMvcApp = document.createElement('todomvc-app');
        main.appendChild(todoMvcApp);

        const todoMvcAppFooter = document.createElement('todomvc-app-footer');
        main.appendChild(todoMvcAppFooter);

        eventLog.add(eventLog.events, [{
            channel: 'app-msg-bus',
            topic: 'app.todos.loaded'
        }]);
    });
});