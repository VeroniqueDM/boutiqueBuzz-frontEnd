
function NewsFeedItem(props) {
    const { newsItem, index } = props;

  

    return (
        <div class="post">
            <div class="post-content">
               
                Name: {newsItem.title}
                Content: {newsItem.content}
                Date Published: {newsItem.publishedAt}
            </div>
        </div>
    );
}

export default NewsFeedItem;
