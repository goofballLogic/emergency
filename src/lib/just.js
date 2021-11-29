export default function Just(acceptedMessageType, ...content) {

    const predicate = messageType => messageType === acceptedMessageType;
    return async function(messageType) {

        if(predicate(messageType)) {

            const ret = [];
            for(const x of content)
                ret.push(await x(...arguments));
            return ret;

        }

    };

}
