import * as messages from "../messages.js";

export default function TimeFocus() {

    let focused;

    async function inbox(message) {

        if(message === messages.startup) {

            focused = todayOffset(-7);


        } else if (message === messages.actions.backOneWeek) {

            focused = fromDayOffset(focused, -7);

        } else {

            return; // noop

        }
        return [ messages.startDateChanged, focused.toISOString() ];

    }

    return inbox;

}

function todayOffset(offset) {

    return fromDayOffset(new Date(), offset);

}

function fromDayOffset(someDay, offset) {

    someDay.setDate(someDay.getDate() + offset);
    someDay.setUTCHours(0, 0, 0, 0);
    return someDay;
}

