import React, { useState, useEffect, useContext } from "react";
import Loader from "../Loader";
import { findById } from "../../Utils";
import { useNavigate, useParams } from "react-router-dom";
import DataContext from "../../DataContext";
import { Link } from "react-router-dom";
import DeleteConfirmationDialog from "../Forms/DeleteConfirmationDialog";

function NewsView() {  
    const { id } = useParams();
    const [isConfirmationDialogVisible, setIsConfirmationDialogVisible] =
    useState(false);
const showConfirmationDialog = () => {
    setIsConfirmationDialogVisible(true);
};
const navigate = useNavigate();

const hideConfirmationDialog = () => {
    setIsConfirmationDialogVisible(false);
};
const [entityData, setEntityData] = useState({});
const [isLoading, setIsLoading] = useState(true);
const { news, setNews, API_BASE_URL} = useContext(DataContext);
//   const eventData = findById(events, id);
// const formattedEventDate = new Date(entityData.eventDate).toLocaleDateString();
const deleteNewsData = (id) => {
  fetch(`${API_BASE_URL}/news/${id}`, {
      method: "DELETE",
      credentials: 'include'
  })
      .then((response) => {
          if (response.ok) {
              setNews((prevNews) =>
                  prevNews.filter((newsArt) => newsArt.id !== id)
              );
          }
      })
      .catch((error) => {
          console.error("Error deleting article:", error);
      });
  navigate(`/news`, {});
};
useEffect(() => {
  async function fetchEntityData() {
    try {
      const response = await fetch(`${API_BASE_URL}/news/${id}`,
      { method: 'GET',  credentials: 'include' }
      );
      if (response.ok) {
        const data = await response.json();
        setEntityData(data);
      }
    } catch (error) {
      console.error(`Error fetching article data:`, error);
    }
    setIsLoading(false);
  }

  fetchEntityData();
},
[]);

return (
  <main className="main-section">
    <div className="entity-view">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          Title: {entityData.title} <br />
          Content: {entityData.content} <br />
          Published: {entityData.publishedAt} <br />
              <Link
          to={`/news/${id}/edit`}
          style={{ textDecoration: "none" }}
          
      >
          <div class="post-title">  EDIT</div>
      </Link>
      <button onClick={showConfirmationDialog}>
                             Delete Event
                         </button>
                         {isConfirmationDialogVisible && (
                            <DeleteConfirmationDialog
                                onConfirm={(event) => {
                                    event.preventDefault();
                                    deleteNewsData(entityData.id);
                                    hideConfirmationDialog();
                                }}
                                onCancel={hideConfirmationDialog}
                            />
                        )}
        </>
      )}
    </div>
  </main>
);
}

export default NewsView;