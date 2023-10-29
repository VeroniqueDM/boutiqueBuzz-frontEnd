
function ColletionsFeedItem(props) {
    const { collection, index } = props;

  

    return (
        <div class="post">
            <div class="post-content">
               
                Name: {collection.name}
                <br />
                Description: {collection.description}
                <br />
                {/* Designer: {collection.designer} */}
            </div>
        </div>
    );
}

export default ColletionsFeedItem;
