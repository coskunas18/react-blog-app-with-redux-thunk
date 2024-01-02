import { parseISO, formatDistanceToNow } from "date-fns";


export default function TimeAgo({ timestamp }) {
    let timeAgo = ''

    if (timestamp) {
        const date = parseISO(timestamp);
        const timePeriod = formatDistanceToNow(date)
        timeAgo = `${timePeriod} ago`
    }

    return (
        <span className="text-sm">
            <i>{timeAgo}</i>
        </span>
    )
}
