import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DataContext from "../../../DataContext";
// import findById from "../../../Utils";
import { findById } from "../../../Utils";

function EditCollectionForm() {
    const { id } = useParams();
    const [imageUrls, setImageUrls] = useState([]);
    const [newImageUrl, setNewImageUrl] = useState("");
    const { collections, setCollections, API_BASE_URL } = useContext(DataContext);
    const navigate = useNavigate();
    const itemData = findById(collections, id);

    // When the component mounts, set the initial imageUrls state
    useEffect(() => {
        setImageUrls(itemData.imageUrls);
    }, [itemData]);

    const addImageUrl = () => {
        if (imageUrls.length < 10 && newImageUrl) {
            setImageUrls([...imageUrls, newImageUrl]);
            setNewImageUrl(""); // Clear the input field
        }
    };

    const removeImageUrl = (index) => {
        const updatedUrls = [...imageUrls];
        updatedUrls.splice(index, 1);
        setImageUrls(updatedUrls);
    };

    const updateCollectionData = async (collectionData) => {
        const updatedCollectionData = {
            ...collectionData,
            imageUrls: imageUrls, // Include the updated image URLs
        };

        try {
            const response = await fetch(`${API_BASE_URL}/collections/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                },
                body: JSON.stringify(updatedCollectionData),
                credentials: 'include'
            });

            if (response.ok) {
                const updatedCollections = collections.map((collection) => {
                    if (collection.id === Number(id)) {
                        return { ...collection, ...updatedCollectionData };
                    }
                    return collection;
                });
                setCollections(updatedCollections);
            } else {
                console.error("Failed to update collection data");
            }
        } catch (error) {
            console.error("An error occurred while updating collection data:", error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await updateCollectionData(itemData); // Use the itemData to maintain other fields
        navigate(`/collections/${id}`, {});
    };

    return (
        <main className="main-section">
            <section className="main__form">
                <form class="form" onSubmit={handleSubmit}>
                    <h2>UPDATE COLLECTION</h2>
                    <p class="warning">* Mandatory fields</p>
                    <br />
                    <div class="edit-field">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={itemData.name} // Pre-filled with existing data
                            readOnly // Make it read-only
                        />
                   
                        <label htmlFor="description">Description:</label>
                        <input
                            type="text"
                            name="description"
                            value={itemData.description} // Pre-filled with existing data
                            readOnly // Make it read-only
                        />
                    </div>

                    <div>
                        {imageUrls.map((url, index) => (
                            <div key={index}>
                                <input
                                    type="text"
                                    value={url} // Pre-filled with existing data
                                    readOnly // Make it read-only
                                />
                                <button onClick={() => removeImageUrl(index)}>
                                    Remove
                                </button>
                            </div>
                        ))}
                        <input
                            type="text"
                            value={newImageUrl}
                            onChange={(e) => setNewImageUrl(e.target.value)}
                        />
                        <button onClick={addImageUrl}>Add Image URL</button>
                    </div>

                    <input
                        class="form__submit"
                        type="submit"
                        value="SAVE CHANGES"
                    />
                </form>
            </section>
        </main>
    );
}

export default EditCollectionForm;
