import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DataContext from "../../../DataContext";
import { findById } from "../../../Utils";

function EditCategoryForm() {
    const { id } = useParams();
    
    const { categories, setCategories, API_BASE_URL } = useContext(DataContext);
    const navigate = useNavigate();
    const categoryData = findById(categories, id);

    const initialState = {
        name: categoryData.name,
        description: categoryData.description,
    };
    const [formData, setFormData] = useState(initialState);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const updateCategoryData = async (categoryData) => {
        const updatedCategoryData = { ...categoryData };
        try {
            const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                },
                body: JSON.stringify(updatedCategoryData),
                credentials: 'include'
            });

            if (response.ok) {
                const updatedCategories = categories.map((category) => {
                    if (category.id === Number(id)) {
                        return { ...category, ...updatedCategoryData };
                    }
                    return category;
                });
                setCategories(updatedCategories);
            } else {
                console.error("Failed to update category data");
            }
        } catch (error) {
            console.error("An error occurred while updating category data:", error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await updateCategoryData(formData);
        navigate(`/categories/${id}`, {});
    };

    return (
        <main className="main-section">
            <section className="main__form">
                <form className="form" onSubmit={handleSubmit}>
                    <h2>UPDATE CATEGORY</h2>
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

export default EditCategoryForm;
