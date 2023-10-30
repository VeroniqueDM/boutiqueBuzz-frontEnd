import React from "react";
import { Link } from "react-router-dom";

function CategoriesFeedItem(props) {
    const { category, index } = props;

    return (
        <tr key={category.id} className="table-row">
            <td className="table-cell">
                <Link to={`/categories/${category.id}`} style={{ textDecoration: "none" }}>
                    {category.name}
                </Link>
            </td>
            <td className="table-cell">
                {category.description}
            </td>
        </tr>
    );
}

export default CategoriesFeedItem;
