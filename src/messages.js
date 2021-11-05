export const config = Symbol("Configuration");
export const startDateChanged = Symbol("Start date changed");
export const entries = Symbol("Entries");
export const entriesError = Symbol("Entries error");
export const projects = Symbol("Projects");
export const output = Symbol("Output");

export const startup = Symbol("Start up");

export const actions = {
    quit: Symbol("Action: Quit"),
    backOneWeek: Symbol("Action: Back one week")
};
