import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { findById } from "../../../Utils";
import DataContext from "../../../DataContext";

function CreateEventForm() {
    // const { id } = useParams();

    const { events, setEvents, API_BASE_URL } = useContext(DataContext);
    const navigate = useNavigate();

    const initialState = {
        title: "",
        description: "",
        eventDate: "",
    };

    const [formData, setFormData] = useState(initialState);
    // const [requiredProfileFieldError, setRequiredProfileFieldError] =
    //     useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const createEventData = async (eventData) => {
        const formattedEventDate = new Date(eventData.eventDate).toISOString();

        const createdEventData = {
            ...eventData,
            eventDate: formattedEventDate,
        };
        try {
            fetch(`${API_BASE_URL}/events`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                },
                body: JSON.stringify(createdEventData),
                credentials: "include",
            })
                .then((response) => response.json())
                .then((newEvent) => setEvents([newEvent, ...events]));
        } catch (error) {
            console.error("Creation failed", error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        createEventData(formData);

        setFormData(initialState);

        navigate(`/events`, {});
    };

    return (
        <main className="main-section">
            <section className="main__form">
                <form class="form" onSubmit={handleSubmit}>
                    <h2>CREATE EVENT</h2>
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
                        <label htmlFor="title">Title:</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
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
                        <label htmlFor="eventDate">Event date:</label>
                        <input
                            type="datetime-local"
                            name="eventDate"
                            value={formData.eventDate}
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

export default CreateEventForm;
