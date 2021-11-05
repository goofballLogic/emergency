import APIFetcher from "./actors/api-fetcher.js";
import ConsoleInput from "./actors/console-input.js";
import ConsoleOutput from "./actors/console-output.js";
import ProjectExtractor from "./actors/project-extractor.js";
import TimeFocus from "./actors/time-focus.js";
import EntryReport from "./actors/entry-report.js";

import * as messages from "./messages.js";

const fetcher = new APIFetcher();
const projectExtractor = new ProjectExtractor();
const timeFocus = new TimeFocus();
const entryReport = new EntryReport();

const consoleOutput = new ConsoleOutput();
const consoleInput = new ConsoleInput();

(async function () {
  await fetcher(messages.config, {
    ...process.env,
    API: "https://api.nokotime.com/v2/",
  });

  let action = messages.startup;
  while (action != messages.actions.quit) {

    const timeFocusResult = await timeFocus(action);
    let result = timeFocusResult ? await fetcher(...timeFocusResult) : [];
    result = (await entryReport(...result)) || result;
    await consoleOutput(messages.output, ...result);

    action = await consoleInput(messages.selectOption, [
      {
        prompt: "Quit",
        message: messages.actions.quit,
      },
      {
        prompt: "Back one week",
        message: messages.actions.backOneWeek,
      },
    ]);
  }
})();
