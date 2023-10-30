import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataContext from "../../../DataContext";

function CreateCategoryForm() {
    const { categories, setCategories, API_BASE_URL } = useContext(DataContext);
    const navigate = useNavigate();

    const initialState = {
        name: "",
        description: "",
    };

    const [formData, setFormData] = useState(initialState);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const createCategoryData = async (categoryData) => {
        const createdCategoryData = { ...categoryData };
        try {
            const response = await fetch(`${API_BASE_URL}/categories`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                },
                body: JSON.stringify(createdCategoryData),
                credentials: 'include'
            });

            if (response.ok) {
                const newCategory = await response.json();
                setCategories([newCategory, ...categories]);
            } else {
                console.error("Failed to create category data");
            }
        } catch (error) {
            console.error("An error occurred while creating category data:", error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        createCategoryData(formData);

        setFormData(initialState);

        navigate(`/categories`, {});
    };

    return (
        <main className="main-section">
            <section className="main__form">
                <form className="form" onSubmit={handleSubmit}>
                    <h2>CREATE CATEGORY</h2>
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

export default CreateCategoryForm;
