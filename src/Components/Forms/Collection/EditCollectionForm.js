import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { findById } from "../../../Utils";
import DataContext from "../../../DataContext";

function EditCollectionForm() {
    const { id } = useParams();
    
    const { collections, setCollections, API_BASE_URL } = useContext(DataContext);
    const navigate = useNavigate();

    const initialState = {
        name: "",
        description: "",
        designer: "",
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

    const updateCollectionData = async (collectionData) => {
        const updatedCollectionData = {
            ...collectionData,
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
        await updateCollectionData(formData);
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

export default EditCollectionForm;
