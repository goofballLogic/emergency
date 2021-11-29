import * as messages from "./messages.js";
import World from "./world.js";

(async function() {

    const world = await World();
    const result = await world(messages.longer, 0, "");
    console.log(...result);

}());
