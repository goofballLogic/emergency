import Just from "../../lib/Just.js";
import * as messages from "../../messages.js";

export default function TestFormatter() {

    return Just(messages.testing.complete, formatTest);

    async function formatTest(_,testResult) {

        console.log(testResult);

    }
}
