import postal from 'postal/lib/postal.lodash'
import Storage from './storage'

let instance = null;

export default class EventLog {
    constructor(events) {
        if(!instance){
            instance = this;
        }

        if(events) {
            this.events = events;
        } else {
            this.events = [];
        }

        return instance;
    }

    add(events, newEvents) {
        let allEvents = events.concat(newEvents);

        Storage.set(allEvents);

        this.events = allEvents;

        for(let event in newEvents) {
            if(newEvents.hasOwnProperty(event)) {
                postal.publish(newEvents[event]);
            }
        }
    }
}