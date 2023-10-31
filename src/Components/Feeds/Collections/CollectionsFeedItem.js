import { Link } from "react-router-dom";

function ColletionsFeedItem(props) {
    const { collection, index } = props;

    return (
        // <div class="post">
        //     <div class="post-content">
        //     <Link
        //     to={`/collections/${collection.id}`}
        //     style={{ textDecoration: "none" }}

        // >
        //     <div class="post-title">  Name: {collection.name}</div>
        // </Link>

        //         <br />
        //         Description: {collection.description}
        //         <br />
        //         {/* Designer: {collection.designer} */}
        //     </div>
        // </div>

        // <tr key={collection.id}>
        //                 <td>
        //                 <Link
        //     to={`/collections/${collection.id}`}
        //     style={{ textDecoration: "none" }}

        // >
        //                     {collection.name}
        //                     </Link>

        //                     </td>
        //                 <td>{collection.description}</td>
        //                 <td>{collection.designerName}</td>
        //                 {/* <td><EditComponent car={collection} handleClick={handleClick}/></td>
        //                 <td><DeleteComponent handleClick={handleClick} id={collection.id}/></td> */}
        //             </tr>

        <tr key={collection.id} className="table-row">
            <td className="table-cell">
                <Link
                    to={`/collections/${collection.id}`}
                    style={{ textDecoration: "none" }}
                >
                    {collection.name}
                </Link>
            </td>
            <td className="table-cell">{collection.description}</td>
            <td className="table-cell">{collection.designerName}</td>
        </tr>
    );
}

export default ColletionsFeedItem;
