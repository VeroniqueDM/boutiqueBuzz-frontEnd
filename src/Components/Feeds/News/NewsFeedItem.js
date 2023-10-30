import { Link } from "react-router-dom";

function NewsFeedItem(props) {
    const { newsItem, index } = props;

  

    return (
        <div class="post">
            <div class="post-content">
            <Link
            to={`/news/${newsItem.id}`}
            style={{ textDecoration: "none" }}
            
        >
            <div class="post-title">     Name: {newsItem.title}</div>
        </Link>
             
                Content: {newsItem.content}
                Date Published: {newsItem.publishedAt}
            </div>
        </div>
    );
}

export default NewsFeedItem;
