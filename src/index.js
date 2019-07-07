import './web-components/todomvc-footer';
import EventLog from './eventLog';
import Storage from './storage'
import reduce from "./reducer";

window.addEventListener('load', () => {
    Storage.get().then( (events) => {
        let eventLog = new EventLog(events);

        let state = reduce(eventLog.events);

        const main = document.querySelector('main');

        const footer = document.createElement('todomvc-footer');

        main.appendChild(footer);
    });
});