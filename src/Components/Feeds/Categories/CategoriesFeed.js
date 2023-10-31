import React, { useContext } from "react";
import DataContext from "../../../DataContext";
import CategoriesFeedItem from "./CategoriesFeedItem";
import { Link } from "react-router-dom";

function CategoriesFeed() {
    const { categories } = useContext(DataContext);

    return (
        <main className="main-section">
            <section className="feed-section">
                <h2 className="section-heading">Categories Feed</h2>
                <br />
                <div>
                    <Link
                        to="/categories/create"
                        style={{ textDecoration: "none" }}
                    >
                        <div className="post-title">ADD NEW CATEGORY</div>
                    </Link>
                </div>
                <div className="post-feed">
                    <table>
                        <thead>
                            <tr className="table-row">
                                <th className="table-cell table-header">
                                    Name
                                </th>
                                <th className="table-cell table-header">
                                    Description
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((category, index) => (
                                <CategoriesFeedItem
                                    key={index}
                                    category={category}
                                    index={index}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    );
}

export default CategoriesFeed;
