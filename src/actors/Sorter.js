import * as messages from "../messages.js";

export default function Sorter() {

    const listeners = [];

    function inbox(message) {
        if(message == messages.filteredWords) {
            const result = arguments[1].sort();            
            listeners.forEach(listener => listener(messages.sortedWords, result));
        }
    };

    inbox.subscribe = function(listener) {
        listeners.push(listener);
    }

    return inbox;

}