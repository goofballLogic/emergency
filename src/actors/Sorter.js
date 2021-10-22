import * as messages from "../messages.js";
import SingleMessageProcessor from "./patterns/SingleMessageProcessor.js";

export default function Sorter() {

    return SingleMessageProcessor(
        messages.filteredWords,
        messages.sortedWords,
        args => args[0].sort()
    );

}