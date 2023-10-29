import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { findById } from "../../../Utils";
import DataContext from "../../../DataContext";

function CreateNewsItemForm() {
      // const { id } = useParams();

      const { news, setNews, API_BASE_URL } = useContext(DataContext);
      const navigate = useNavigate();
  
      const initialState = {
          title: "",
          content: "",
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
  
      const createNewsData = async (newsData) => {
        //   const formattedNewsDate = new Date(newsData.publishedAt).toISOString();
  
          const createdNewsData = {
              ...newsData,
            //   publishedAt: formattedNewsDate,
          };
          fetch(`${API_BASE_URL}/news`, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json; charset=UTF-8",
              },
              body: JSON.stringify(createdNewsData),
              credentials: 'include' 

          })
              .then((response) => response.json())
              .then((newArticle) => setNews([newArticle, ...news]));
      };
  
      const handleSubmit = async (event) => {
          event.preventDefault();
          createNewsData(formData);
  
          setFormData(initialState);
  
          navigate(`/news`, {});
      };
  
      return (
          <main className="main-section">
              <section className="main__form">
                  <form class="form" onSubmit={handleSubmit}>
                      <h2>CREATE NEWS ARTICLE</h2>
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

export default CreateNewsItemForm;
