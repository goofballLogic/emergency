import LongerString from "./actors/longer-string.js";
import Neighbourhood from "./lib/neighbourhood.js";
import Replay from "./lib/replay.js";
import { add } from "./messages.js";

export default async function World() {

    const data = [
        "the",
        "quick",
        "brown",
        "fox",
        "jumps",
        "over",
        "the",
        "lazy",
        "dog"
    ];
    const longerStrings = data.map(LongerString);
    const neighbourhood = new Neighbourhood();
    await neighbourhood(add, ...longerStrings);
    return new Replay(neighbourhood);

}
