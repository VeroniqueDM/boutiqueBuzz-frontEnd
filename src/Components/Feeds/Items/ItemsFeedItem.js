import { Link } from "react-router-dom";

function ItemsFeedItem(props) {
    const { item, index } = props;

    return (
        <tr key={item.id} className="table-row">
            <td className="table-cell">
                <Link
                    to={`/items/${item.id}`}
                    style={{ textDecoration: "none" }}
                >
                    {item.name}
                </Link>
            </td>
            <td className="table-cell">{item.description}</td>
            <td className="table-cell">{item.designerName}</td>
        </tr>
    );
}

export default ItemsFeedItem;
