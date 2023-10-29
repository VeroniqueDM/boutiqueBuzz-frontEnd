import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { findById } from "../../../Utils";
import DataContext from "../../../DataContext";

function EditNewsItemForm() {
    const { id } = useParams();
    
    const { news, setNews, API_BASE_URL } = useContext(DataContext);
    const newsData = findById(news, id);
    const navigate = useNavigate();
    // const nameArray = userData.name.split(" ");

    const initialState = {
        title: newsData.title,
        content: newsData.content,
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

    const updateNewsData = async (newsData) => {
        const updatedNewsData = {
            ...newsData,
        };
        try {
            const response = await fetch(`${API_BASE_URL}/news/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                },
                body: JSON.stringify(updatedNewsData),
                credentials: 'include' 

            });

            if (response.ok) {
                const updatedNews = news.map((newsArt) => {
                    if (newsArt.id === Number(id)) {
                        return { ...newsArt, ...updatedNewsData };
                    }
                    return newsArt;
                });
                setNews(updatedNews);
            } else {
                console.error("Failed to update article data");
            }
        } catch (error) {
            console.error("An error occurred while updating article data:", error);
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
        await updateNewsData(formData);
        navigate(`/news/${id}`, {});
    };

    return (
        <main className="main-section">
            <section className="main__form">
                <form class="form" onSubmit={handleSubmit}>
                    <h2>UPDATE NEWS ARTICLE</h2>
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
                        <label htmlFor="content">Content:</label>
                        <input
                            type="text"
                            name="content"
                            value={formData.content}
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

export default EditNewsItemForm;
