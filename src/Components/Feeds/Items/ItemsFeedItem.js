import { Link } from "react-router-dom";

function ItemsFeedItem(props) {
    const { item, index } = props;

  

    return (
        <div class="post">
            <div class="post-content">
            <Link
            to={`/items/${item.id}`}
            style={{ textDecoration: "none" }}
            
        >
            <div class="post-title">   Name: {item.name}</div>
        </Link>
             
                Description: {item.description}
                Designer: {item.designerName}
            </div>
        </div>
    );
}

export default ItemsFeedItem;
