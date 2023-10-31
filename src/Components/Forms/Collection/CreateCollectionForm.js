import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataContext from "../../../DataContext";

function CreateCollectionForm() {
    const { collections, setCollections, API_BASE_URL } =
        useContext(DataContext);
    const navigate = useNavigate();

    const initialState = {
        name: "",
        description: "",
        designer: "",
        imageUrls: [],
    };

    const [formData, setFormData] = useState(initialState);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleImageUrlChange = (event, index) => {
        const imageUrl = event.target.value;

        setFormData((prevFormData) => {
            const updatedImageUrls = [...prevFormData.imageUrls];
            updatedImageUrls[index] = imageUrl;
            return {
                ...prevFormData,
                imageUrls: updatedImageUrls,
            };
        });
    };

    const addImageUrlField = () => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            imageUrls: [...prevFormData.imageUrls, ""],
        }));
    };

    const removeImageUrlField = (index) => {
        setFormData((prevFormData) => {
            const updatedImageUrls = [...prevFormData.imageUrls];
            updatedImageUrls.splice(index, 1);
            return {
                ...prevFormData,
                imageUrls: updatedImageUrls,
            };
        });
    };

    const createCollectionData = async (collectionData) => {

        fetch(`${API_BASE_URL}/collections`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify(collectionData),
            credentials: "include",
        })
            .then((response) => response.json())
            .then((newCollection) =>
                setCollections([newCollection, ...collections])
            );
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        createCollectionData(formData);

        setFormData(initialState);

        navigate(`/collections`, {});
    };

    return (
        <main className="main-section">
            <section className="main__form">
                <form className="form" onSubmit={handleSubmit}>
                    <h2>CREATE COLLECTION</h2>
                    <p className="warning">* Mandatory fields</p>
                    <br />
                    <div className="edit-field">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <label htmlFor="description">Description:</label>
                        <input
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="edit-field">
                        <label>Image URLs:</label>
                        {formData.imageUrls.map((url, index) => (
                            <div key={index} className="image-url-input">
                                <input
                                    type="text"
                                    value={url}
                                    onChange={(event) =>
                                        handleImageUrlChange(event, index)
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

export default CreateCollectionForm;
