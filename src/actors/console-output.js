import * as messages from "../messages.js";

export default function ConsoleOutput() {

    async function inbox(message) {

        if(message !== messages.output) return;
        const [ , outputType, data ] = arguments;
        if(outputType || data) {

            if (data instanceof Error) {

                console.error("ERROR", outputType);
                console.error("ERROR", data);

            } else {

                console.log(outputType);
                console.log(data);

            }

        }

    }

    return inbox;


}
