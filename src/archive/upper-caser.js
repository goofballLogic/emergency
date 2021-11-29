import Just from "./skins/Just.js";
import * as messages from "../messages.js";

export default function UpperCaser() {

    return Just(messages.info, function(_, ...args) {

        return [

            messages.uppercase,
            ...args.map(x => typeof x === "string" ? x.toUpperCase() : x)

        ];

    });

}
