import cliSelect from "cli-select";
import * as messages from "../messages.js";


export default function ConsoleInput() {

    async function inbox(messageType) {

        if(messageType !== messages.selectOption) return;
        const [ , options ] = arguments;
        const selectOptions = {
            values: options.map(o => o.prompt),
            cleanup: false
        };

        console.log("Select an option (Escape to quit):");

        let selected;
        try {

            selected = await cliSelect(selectOptions);

        } catch(_) {

            return messages.actions.quit;

        }

        const selectedOption = options[selected.id];
        return selectedOption.message;

    }

    return inbox;
}
