import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { findById } from "../../../Utils";
import DataContext from "../../../DataContext";

function CreateCollectionForm() {
    // const { id } = useParams();

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

    const createCollectionData = async (collectionData) => {
        // const formattedEventDate = new Date(collectionData.eventDate).toISOString();

        const createdEventData = {
            ...collectionData,
            // eventDate: formattedEventDate,
        };
        fetch(`${API_BASE_URL}/collections`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify(createdEventData),
            credentials: 'include' 

        })
            .then((response) => response.json())
            .then((newEvent) => setCollections([newEvent, ...collections]));
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
                <form class="form" onSubmit={handleSubmit}>
                    <h2>CREATE COLLECTION</h2>
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

export default CreateCollectionForm;
