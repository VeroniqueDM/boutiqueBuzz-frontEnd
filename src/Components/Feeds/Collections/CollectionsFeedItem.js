import { Link } from "react-router-dom";

function ColletionsFeedItem(props) {
    const { collection, index } = props;

  

    return (
        <div class="post">
            <div class="post-content">
            <Link
            to={`/collections/${collection.id}`}
            style={{ textDecoration: "none" }}
            
        >
            <div class="post-title">  Name: {collection.name}</div>
        </Link>
              
               
                <br />
                Description: {collection.description}
                <br />
                {/* Designer: {collection.designer} */}
            </div>
        </div>
    );
}

export default ColletionsFeedItem;
