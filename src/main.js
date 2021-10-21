import Concat from "./actors/Concat.js";
import World from "./World.js";
import * as messages from "./messages.js";
import Sorter from "./actors/Sorter.js";
import Filter from "./actors/Filter.js";

const world = new World();
world.add(new Concat());
world.add(new Sorter());
world.add(new Filter());

const results = 
    world(
        [messages.concatenatedWords],
        messages.words, 
        "What if I were to simply stop trying and allow the tide to take me where it will".split(" ")
    );

console.log(results.map(x => x[1])[0]);