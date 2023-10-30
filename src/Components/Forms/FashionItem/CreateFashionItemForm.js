import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { findById } from "../../../Utils";
import DataContext from "../../../DataContext";

function CreateFashionItemForm() {
    // const { id } = useParams();
    const [selectedCategory, setSelectedCategory] = useState("");

    const { categories, setCategories, items, setItems, API_BASE_URL } =
        useContext(DataContext);
    // const designerData = findById(designers, id);
    const navigate = useNavigate();
    // // const nameArray = userData.name.split(" ");

    const initialState = {
        name: "",
        description: "",
        designer: "",
        category: "",
    };

    const [formData, setFormData] = useState(initialState);
    // // const [requiredProfileFieldError, setRequiredProfileFieldError] =
    // //     useState(false);

    //    const handleChange = (event) => {
    //        const { name, value } = event.target;

    //        setFormData((prevFormData) => ({
    //            ...prevFormData,
    //            [name]: value,
    //        }));
    //    };
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));

        if (name === "category") {
            // Update the selected category state
            setSelectedCategory(value);
        }
    };

    const createItemData = async (itemData) => {
        // const formattedEventDate = new Date(designerData.eventDate).toISOString();

        const createdItemData = {
            ...itemData,
            category: selectedCategory,
        };
        fetch(`${API_BASE_URL}/items`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify(createdItemData),
            credentials: "include",
        })
            .then((response) => response.json())
            .then((newItem) => setItems([newItem, ...items]));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        createItemData(formData);

        setFormData(initialState);

        navigate(`/items`, {});
    };

    return (
        <main className="main-section">
            <section className="main__form">
                <form class="form" onSubmit={handleSubmit}>
                    <h2>CREATE ITEM</h2>
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
                        {/* <RequiredProfileFieldWarning
                               requiredProfileFieldError={
                                   requiredProfileFieldError
                               }
                           /> */}

                        <label htmlFor="description">Description:</label>
                        <input
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>
                    <label htmlFor="category">Select a Category:</label>
                    <select
                        id="category"
                        name="category"
                        value={selectedCategory}
                        // onChange={(e) => setSelectedCategory(e.target.value)}
                        onChange={handleChange}
                    >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
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

export default CreateFashionItemForm;
