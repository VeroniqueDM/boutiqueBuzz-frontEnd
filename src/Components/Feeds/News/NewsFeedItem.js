import { Link } from "react-router-dom";

function NewsFeedItem(props) {
    const { newsItem, index } = props;
    function formatDate(dateString) {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }
    return (
        <tr key={newsItem.id} className="table-row">
            <td className="table-cell">
                <Link
                    to={`/news/${newsItem.id}`}
                    style={{ textDecoration: "none" }}
                >
                    {newsItem.title}
                </Link>
            </td>
            <td className="table-cell">{newsItem.content}</td>
            <td className="table-cell">{formatDate(newsItem.publishedAt)}</td>
        </tr>
    );
}

export default NewsFeedItem;
