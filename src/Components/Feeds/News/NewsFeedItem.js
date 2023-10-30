import { Link } from "react-router-dom";

function NewsFeedItem(props) {
    const { newsItem, index } = props;

    return (
        <tr key={newsItem.id} className="table-row">
            <td className="table-cell">
                <Link to={`/news/${newsItem.id}`} style={{ textDecoration: "none" }}>
                    {newsItem.title}
                </Link>
            </td>
            <td className="table-cell">
                {newsItem.content}
            </td>
            <td className="table-cell">
                {newsItem.publishedAt}
            </td>
        </tr>
    );
}

export default NewsFeedItem;
