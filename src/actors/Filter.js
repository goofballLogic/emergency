import * as messages from "../messages.js";

export default function Filter() {

    const listeners = [];

    function inbox(message) {
        if(message == messages.words) {            
            const result = arguments[1].filter(x => x.length >=3 && x.length <= 5);
            listeners.forEach(listener => listener(messages.filteredWords, result));
        }
    };

    inbox.subscribe = function(listener) {
        listeners.push(listener);
    }

    return inbox;

}