import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { findById } from "../../../Utils";
import DataContext from "../../../DataContext";

function EditDesignerForm() {
    const { id } = useParams();

    const { designers, setDesigners, API_BASE_URL } = useContext(DataContext);
    const designerData = findById(designers, id);
    const navigate = useNavigate();
    // const nameArray = userData.name.split(" ");

    const initialState = {
        name: designerData.name,
        email: designerData.email,
        phone: designerData.phone,
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

    const updateDesignerData = async (designerData) => {
        const updatedDesignerData = {
            ...designerData,
        };
        try {
            const response = await fetch(`${API_BASE_URL}/designers/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                },
                body: JSON.stringify(updatedDesignerData),
                credentials: "include",
            });

            if (response.ok) {
                const updatedDesigners = designers.map((designer) => {
                    if (designer.id === Number(id)) {
                        return { ...designer, ...updatedDesignerData };
                    }
                    return designer;
                });
                setDesigners(updatedDesigners);
            } else {
                console.error("Failed to update designer data");
            }
        } catch (error) {
            console.error(
                "An error occurred while updating designer data:",
                error
            );
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
        await updateDesignerData(formData);
        navigate(`/designers/${id}`, {});
    };

    return (
        <main className="main-section">
            <section className="main__form">
                <form class="form" onSubmit={handleSubmit}>
                    <h2>UPDATE DESIGNER INFO</h2>
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

                        <label htmlFor="email">Email:</label>
                        <input
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <label htmlFor="phone">Phone:</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
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

export default EditDesignerForm;
