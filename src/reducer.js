export default function reduce(events) {
    "use strict";

    return events.reduce( (state, event) => {
        if(event.topic === 'app.increment.count') {
            state.count += 1;
        }

        if(event.topic === 'app.decrement.count') {
            state.count -= 1;
        }

        return state;
    }, {
        count: 0
    })
}