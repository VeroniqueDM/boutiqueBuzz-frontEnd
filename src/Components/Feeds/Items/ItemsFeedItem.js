
function ItemsFeedItem(props) {
    const { item, index } = props;

  

    return (
        <div class="post">
            <div class="post-content">
               
                Name: {item.name}
                Description: {item.description}
                Designer: {item.designerName}
            </div>
        </div>
    );
}

export default ItemsFeedItem;
