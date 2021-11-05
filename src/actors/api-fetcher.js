import * as messages from "../messages.js";
import fetch from "node-fetch";

export default function APIFetcher() {

    const config = {};
    let user;

    return async function(message) {

        if(message === messages.config) {

            const [ , settings ] = arguments;
            config.NOKO_PAT = settings.NOKO_PAT;
            config.API = settings.API;

        } else if (message === messages.startDateChanged) {

            const [ , startDate ] = arguments;
            try {

                return [
                    messages.entries,
                    await handleStartDateChanged(startDate)
                ];

            } catch(err) {

                return [ messages.entriesError, err ];
            }

        }

    }

    async function fetchUserDetails() {

        const url = new URL(config.API);
        url.pathname += "current_user/";
        const fetched = await fetchWithToken(url);
        user = await fetched.json();

    }

    async function fetchWithToken(url) {
        return await fetch(url, { headers: { "X-NokoToken": config.NOKO_PAT } });
    }

    async function handleStartDateChanged(startDateString) {

        if (!user) {

            await fetchUserDetails();

        }

        const startDate = startDateString;
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 6);

        const result = {
            startDate: startDate.substring(0, 10),
            endDate: endDate.toISOString().substring(0, 10),
            user: {
                id: user.id,
                email: user.email
            }
        };

        const url = new URL(config.API);

        url.pathname += "entries";
        url.searchParams.set("from", result.startDate);
        url.searchParams.set("to", result.endDate);
        url.searchParams.set("user_ids", user.id);

        const fetched = await fetchWithToken(url);
        if (!fetched.ok) {

            throw new Error(`Failed to fetch from API: ${fetched.statusText} ${fetched.status}`);

        } else {

            result.data = await fetched.json();
            return result;

        }

    }

}
