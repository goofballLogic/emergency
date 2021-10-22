import * as messages from "../messages.js";
import SingleMessageProcessor from "./patterns/SingleMessageProcessor.js";

export default function Concat() {

    return SingleMessageProcessor(
        messages.sortedWords,
        messages.concatenatedWords,
        args => args.join(" ")
    );

}