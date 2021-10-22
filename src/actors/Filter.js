import * as messages from "../messages.js";
import SingleMessageProcessor from "./patterns/SingleMessageProcessor.js";

export default function Filter() {

    return SingleMessageProcessor(
        messages.words, 
        messages.filteredWords, 
        args => args[0].filter(x => x.length >=3 && x.length <= 5)
    );

}