export default function SingleMessageProcessor(inputMessageType, outputMessageType, callback) {

    const listeners = [];

    function inbox(message, ...args) {
        if(message == inputMessageType) {
            const result = callback(args);
            listeners.forEach(listener => listener(outputMessageType, result));
        }
    };

    inbox.subscribe = function(listener) {
        listeners.push(listener);
    }

    return inbox;

}