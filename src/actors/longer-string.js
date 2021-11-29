import Just from "../lib/just.js";
import * as messages from "../messages.js";

export default function LongerString(value) {

    const length = value.length;
    return Just(messages.longer, function(_, wordLength) {

        if(length > wordLength) {

            return [ messages.longer, length, value ];
        }

    });

}
