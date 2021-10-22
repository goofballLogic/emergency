import Concat from "./actors/Concat.js";
import World from "./World.js";
import * as messages from "./messages.js";
import Sorter from "./actors/Sorter.js";
import Filter from "./actors/Filter.js";

const world = new World();
world.add(Concat());
world.add(Sorter());
world.add(Filter());

const results = 
    world(
        [messages.concatenatedWords],
        messages.words, 
        "What if I were to simply stop trying and allow the tide to take me where it will".split(" ")
    );

const result = results[0][1];

console.log(result);