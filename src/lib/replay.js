import * as messages from "../messages.js";

export default function Replay(child, maxIterations = 1000) {

    return async function execute(...args) {

        const stack = [ args ];
        let iterations = maxIterations;
        let next;
        while(stack.length) {
            if(--iterations<1) throw new Error("Replayed too many times");
            next = stack.shift();
            const result = await child(...next);
            const resultArray = (result[0] === messages.results)
                ? result[1].filter(x => x)
                : result ? [ result ] : [];
            resultArray.forEach(x => stack.push(x));
        }

        return next;

    }

}
