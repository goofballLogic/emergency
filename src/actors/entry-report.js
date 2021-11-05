import * as messages from "../messages.js";

const dtfFull = new Intl.DateTimeFormat("en", {
    dateStyle: "full"
});

const dtfWeekday = new Intl.DateTimeFormat("en", {
    day: "numeric",
    weekday: "long"
});


export default function EntryReport() {

    async function inbox(messageType) {

        if(messageType === messages.entries) {

            const [ , { startDate, endDate, data } ] = arguments;
            const startDateObject = new Date(startDate);
            const startDateString = dtfFull.format(startDateObject);
            let report = [
                startDateString,
                "-".repeat(startDateString.length)
            ];
            if(data.length) {

                report = [...report, ...reportOnItems(data) ];

            } else {

                report.push("No entries");

            }
            report.push("");
            return [ messages.report, report.join("\n") ];

        }

    }

    return inbox;

}

function groupBy(xs, key) {

    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});

  }

function reportOnItems(items) {

    items = items.map(item => ({
        minutes: item.minutes,
        description: item.description,
        updated_at: item.updated_at,
        date: item.date,
        projectName: item.project.name,
    }));
    const grouped = groupBy(items, "date");
    const report = [];
    for(var when of Object.keys(grouped).sort()) {

        const parts = dtfWeekday.formatToParts(Date.parse(when));
        console.log(parts);
        console.log(new Intl.PluralRules("en").select(parts[0].value));

        report.push(dtfWeekday.format(Date.parse(when)));

    }
    return report;

}
