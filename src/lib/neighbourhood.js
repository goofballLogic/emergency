import * as messages from "../messages.js";

export default function Neighbourhood() {

    const cells = [];
    return async function(messageType) {

        if(messageType === messages.add) {

            const [ _, ...adding ] = arguments;
            cells.push(...adding);

        } else {

            let ret = [];
            for(const cell of cells) {

                const cellRet = await cell(...arguments);
                if(cellRet) {

                    ret = ret.concat(cellRet);

                }

            }
            return [ messages.results, ret ];

        }

    };

}
