import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DataContext from "../../../DataContext";
import { findById } from "../../../Utils";

function EditCollectionForm() {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrls, setImageUrls] = useState([]);
    const { collections, setCollections, API_BASE_URL } = useContext(DataContext);
    const navigate = useNavigate();
    const itemData = findById(collections, id);

    useEffect(() => {
        setName(itemData.name);
        setDescription(itemData.description);
        setImageUrls(itemData.imageUrls);
    }, [itemData]);

    const addImageUrlField = () => {
        setImageUrls([...imageUrls, ""]);
    };

    const removeImageUrlField = (index) => {
        const updatedUrls = [...imageUrls];
        updatedUrls.splice(index, 1);
        setImageUrls(updatedUrls);
    };

    const updateCollectionData = async () => {
        const updatedCollectionData = {
            ...itemData,
            name,
            description,
            imageUrls,
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
        await updateCollectionData();
        navigate(`/collections/${id}`, {});
    };

    return (
        <main className="main-section">
            <section className="main__form">
                <form className="form" onSubmit={handleSubmit}>
                    <h2>UPDATE COLLECTION</h2>
                    <p className="warning">* Mandatory fields</p>
                    <br />

                    <div className="edit-field">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <label htmlFor="description">Description:</label>
                        <input
                            type="text"
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="edit-field">
                        <label>Image URLs:</label>
                        {imageUrls.map((url, index) => (
                            <div key={index} className="image-url-input">
                                <input
                                    type="text"
                                    value={url}
                                    onChange={(event) =>
                                        setImageUrls((prevUrls) => {
                                            const updatedUrls = [...prevUrls];
                                            updatedUrls[index] = event.target.value;
                                            return updatedUrls;
                                        })
                                    }
                                />
                                <button
                                    type="button"
                                    onClick={() => removeImageUrlField(index)}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button type="button" onClick={addImageUrlField}>
                            Add Image URL
                        </button>
                    </div>

                    <input
                        className="form__submit"
                        type="submit"
                        value="SAVE CHANGES"
                    />
                </form>
            </section>
        </main>
    );
}

export default EditCollectionForm;
