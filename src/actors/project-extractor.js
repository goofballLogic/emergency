import * as messages from "../messages.js";

export default function ProjectExtractor() {

    async function inbox(message) {

        if(message === messages.entries) {

            const [ , entries ] = arguments;
            return [

                messages.projects,
                extractProjects(entries)

            ];

        }

    }

    return inbox;

    function extractProjects({ data = [] }) {

        return Object.values(
            Object.fromEntries(
                data.map(x => [x.project.id, x.project])
            )
        );

    }

}
