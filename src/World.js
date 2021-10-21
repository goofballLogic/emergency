export default function World() {

    const things = [];

    let tappedMessages = [];
    let results = [];

    function inbox(outputMessages, ...args) { 
        tappedMessages = outputMessages;    
        results = [];
        internalInbox(...args);
        return results;
    }

    function internalInbox(...args) {
        if(tappedMessages.some(message => message === args[0])) {
            results.push(args);
        }

        things.forEach(thing => thing(...args));
    }

    inbox.add = function(thing) {
        things.push(thing);
        if(thing.subscribe) thing.subscribe(internalInbox);
    };

    return inbox;

}