import { useContext, useState, useEffect } from "react";
import DataContext from "../../../DataContext";
import ItemsFeedItem from "./ItemsFeedItem";
import { Link } from "react-router-dom";

function ItemsFeed() {
    const { items, categories,API_BASE_URL  } = useContext(DataContext);
    const [isLoading, setIsLoading] = useState(false);
    const [filteredItems, setFilteredItems] = useState([]);

    const [selectedCategory, setSelectedCategory] = useState(""); // Initialize with an empty string
    const filterItemsByCategory = async () => {
        setIsLoading(true);

        try {
            let url = `${API_BASE_URL}/items`;

            if (selectedCategory) {
                url = `${API_BASE_URL}/items/filter?category=${selectedCategory}`;
            }

            const response = await fetch(url,{ method: 'GET',  credentials: 'include' });
            if (response.ok) {
                const data = await response.json();
                setFilteredItems(data);
            } else {
                console.error("Failed to fetch filtered items");
            }
        } catch (error) {
            console.error("An error occurred while filtering items:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setFilteredItems(items);
    }, [items]);

    return (
        <main className="main-section">
            <section className="feed-section">
            <div>
                    <div>
                        <label htmlFor="category">Select Category:</label>
                        <select
                            id="category"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option value="">All Categories</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button onClick={filterItemsByCategory}>Filter</button>
                </div>
                <br />
                <div>
                    <Link to="/items/create" style={{ textDecoration: "none" }}>
                        <div className="post-title">ADD NEW ITEM</div>
                    </Link>
                </div>
                <div className="post-feed">
                    <table>
                        <thead>
                            <tr className="table-row">
                                <th className="table-cell table-header">Name</th>
                                <th className="table-cell table-header">Description</th>
                                <th className="table-cell table-header">Designer</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td colSpan="3">Loading...</td>
                                </tr>
                            ) : (
                                (selectedCategory ? filteredItems : items).map((item, index) => (
                                    <ItemsFeedItem key={index} item={item} index={index} />
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    );
}

export default ItemsFeed;
