import React, { useState, useEffect, useContext } from "react";
import Loader from "../Loader";
import { findById } from "../../Utils";
import { useNavigate, useParams } from "react-router-dom";
import DataContext from "../../DataContext";
import { Link } from "react-router-dom";
import DeleteConfirmationDialog from "../Forms/DeleteConfirmationDialog";

function DesignerView() {
    const { id } = useParams();
    const navigate = useNavigate();
  const [entityData, setEntityData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { designers, setDesigners ,API_BASE_URL} = useContext(DataContext);
//   const eventData = findById(events, id);
// const formattedEventDate = new Date(entityData.eventDate).toLocaleDateString();
const deleteDesignerData = (id) => {
  fetch(`${API_BASE_URL}/designers/${id}`, {
      method: "DELETE",
      credentials: 'include'
  })
      .then((response) => {
          if (response.ok) {
              setDesigners((prevDesigners) =>
                  prevDesigners.filter((designer) => designer.id !== id)
              );
          }
      })
      .catch((error) => {
          console.error("Error deleting designer:", error);
      });
  navigate(`/designers`, {});
};
  useEffect(() => {
    async function fetchEntityData() {
      try {
        const response = await fetch(`${API_BASE_URL}/designers/${id}`,
        { method: 'GET',  credentials: 'include' });
        if (response.ok) {
          const data = await response.json();
          setEntityData(data);
        }
      } catch (error) {
        console.error(`Error fetching designer data:`, error);
      }
      setIsLoading(false);
    }

    fetchEntityData();
  },
  []);
  const [isConfirmationDialogVisible, setIsConfirmationDialogVisible] =
        useState(false);
  const showConfirmationDialog = () => {
    setIsConfirmationDialogVisible(true);
};
const hideConfirmationDialog = () => {
  setIsConfirmationDialogVisible(false);
};
  return (
    <main className="main-section">
      <div className="entity-view">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            Name: {entityData.name} <br />
            Email: {entityData.email} <br />
            Phone: {entityData.phone} <br />
                <Link
            to={`/designers/${id}/edit`}
            style={{ textDecoration: "none" }}
            
        >
            <div class="post-title">  EDIT</div>
        </Link>
        <button onClick={showConfirmationDialog}>
                             Delete Designer
                         </button>
          </>
          
        )}
        
        {isConfirmationDialogVisible && (
                            <DeleteConfirmationDialog
                                onConfirm={(event) => {
                                    event.preventDefault();
                                    deleteDesignerData(entityData.id);
                                    hideConfirmationDialog();
                                }}
                                onCancel={hideConfirmationDialog}
                            />
                        )}
      </div>
    </main>
  );
}

export default DesignerView;