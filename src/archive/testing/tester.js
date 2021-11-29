import * as messages from "../../messages.js";
import Just from "../../lib/just.js";

export default function Tester() {

    async function execute(_, given, when, then) {

        const context = {};
        let stopped = false;
        const results = [];

        for(const stage of [given, when, then]) {

            if(!stage) continue;
            for(const step of [].concat(stage)) {

                await executeStep(step, stage);
                if(stopped) break;

            }
            if (stopped) break;

        }


        return [
            messages.testing.complete,
            {
                state: results.length ? results[results.length - 1][0] : messages.testing.pending,
                steps: results
            }
         ];

        async function executeStep(step, stage) {

            const isValid = step && step.call;
            const outcome = isValid ? await step.call(context) : invalidStep(step, stage);
            results.push(outcome);
            const [outcomeType] = outcome;
            stopped = outcomeType !== messages.testing.ok;

        }

        function invalidStep(nonStep, containingStage) {

            const stageDescription = containingStage === given ? "Given" : containingStage === when ? "When": "Then";
            return [
                messages.testing.failed,
                `Expected ${stageDescription} step to be a function, or to expose a "call" function, but was a ${typeof nonStep}`
            ];

        }

    }
    return Just(messages.testing.requested, execute);

}
