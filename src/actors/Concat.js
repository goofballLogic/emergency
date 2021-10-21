import * as messages from "../messages.js";

export default function Concat() {

    const listeners = [];

    function inbox(message, ...args) {
        if(message == messages.sortedWords) {
            const result = args.join(" ");
            listeners.forEach(listener => listener(messages.concatenatedWords, result));
        }
    };

    inbox.subscribe = function(listener) {
        listeners.push(listener);
    }

    return inbox;

}