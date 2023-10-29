import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { findById } from "../../../Utils";
import DataContext from "../../../DataContext";

function EditEventForm() {
    const { id } = useParams();
    
    const { events, setEvents, API_BASE_URL } = useContext(DataContext);
    const eventData = findById(events, id);
    const navigate = useNavigate();
    // const nameArray = userData.name.split(" ");

    const initialState = {
        title: eventData.title,
        description: eventData.description,
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

    const updateEventData = async (eventData) => {
        const updatedEventData = {
            ...eventData,
        };
        try {
            const response = await fetch(`${API_BASE_URL}/events/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                },
                body: JSON.stringify(updatedEventData),
                credentials: 'include' 

            });

            if (response.ok) {
                const updatedEvents = events.map((event) => {
                    if (event.id === Number(id)) {
                        return { ...event, ...updatedEventData };
                    }
                    return event;
                });
                setEvents(updatedEvents);
            } else {
                console.error("Failed to update event data");
            }
        } catch (error) {
            console.error("An error occurred while updating event data:", error);
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
        await updateEventData(formData);
        navigate(`/events/${id}`, {});
    };

    return (
        <main className="main-section">
            <section className="main__form">
                <form class="form" onSubmit={handleSubmit}>
                    <h2>UPDATE EVENT</h2>
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

export default EditEventForm;
