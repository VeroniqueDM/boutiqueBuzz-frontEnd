import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { findById } from "../../../Utils";
import DataContext from "../../../DataContext";

function EditFashionItemForm() {
    const { id } = useParams();
    
    const { items, setItems, API_BASE_URL } = useContext(DataContext);
    const itemData = findById(items, id);

    const navigate = useNavigate();

    const initialState = {
        name: itemData.name,
        description: itemData.description,
        designer: itemData.designer,
        imageUrl: itemData.imageUrl, // Initialize with existing imageUrl

    };
    const [formData, setFormData] = useState(initialState);
    // // const [requiredProfileFieldError, setRequiredProfileFieldError] =
    // //     useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
 
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }));
    };

    const updateItemData = async (itemData) => {
        const updatedItemData = {
            ...itemData,
        };
        try {
            const response = await fetch(`${API_BASE_URL}/items/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                },
                body: JSON.stringify(updatedItemData),
                credentials: 'include' 

            });

            if (response.ok) {
                const updatedItems = items.map((item) => {
                    if (item.id === Number(id)) {
                        return { ...item, ...updatedItemData };
                    }
                    return item;
                });
                setItems(updatedItems);
            } else {
                console.error("Failed to update item data");
            }
        } catch (error) {
            console.error("An error occurred while updating item data:", error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // if (
        //     !formData.firstName ||
        //     !formData.lastName ||
        //     !formData.email ||
        //     !formData.username ||
        //     !formData.phone
        // ) {
        //     setRequiredProfileFieldError(true);
        //     return;
        // } else {
        //     setRequiredProfileFieldError(false);
        // }
        await updateItemData(formData);
        navigate(`/items/${id}`, {});
    };

    return (
        <main className="main-section">
            <section className="main__form">
                <form class="form" onSubmit={handleSubmit}>
                    <h2>UPDATE ITEM</h2>
                    <p class="warning">* Mandatory fields</p>
                    <br />
                    <div class="edit-field">
                        {/* <h3>
                            NAME <span class="warning small">*</span>
                        </h3> */}
                        {/* <RequiredProfileFieldWarning
                            requiredProfileFieldError={
                                requiredProfileFieldError
                            }
                        /> */}
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    <label htmlFor="imageUrl">Image URL:</label>
            <input
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
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
                        class="form__submit"
                        type="submit"
                        value="SAVE CHANGES"
                    />
                </form>
            </section>
        </main>
    );
}

export default EditFashionItemForm;
