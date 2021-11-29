import Just from "./Just.js";
import * as messages from "../messages.js";

export default function ConsoleWriter() {

    return Just(messages.info, function(_, ...args) {

        console.log(...args);

    });

}
