import React, { useState, useEffect, useContext } from "react";
import Loader from "../Loader";
import { findById } from "../../Utils";
import { useNavigate, useParams } from "react-router-dom";
import DataContext from "../../DataContext";
import { Link } from "react-router-dom";
import DeleteConfirmationDialog from "../Forms/DeleteConfirmationDialog";

function CollectionView() {
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
    const {collections,setCollections, API_BASE_URL } = useContext(DataContext);
    //   const eventData = findById(events, id);
    // const formattedEventDate = new Date(entityData.eventDate).toLocaleDateString();
    const deleteCollectionData = (id) => {
        fetch(`${API_BASE_URL}/collections/${id}`, {
            method: "DELETE",
            credentials: 'include'
        })
            .then((response) => {
                if (response.ok) {
                    setCollections((prevCollections) =>
                        prevCollections.filter((collections) => collections.id !== id)
                    );
                }
            })
            .catch((error) => {
                console.error("Error deleting collection:", error);
            });
        navigate(`/collections`, {});
    };
    useEffect(() => {
        async function fetchEntityData() {
            try {
                const response = await fetch(`${API_BASE_URL}/collections/${id}`,
                { method: 'GET',  credentials: 'include' }
                );
                if (response.ok) {
                    const data = await response.json();
                    setEntityData(data);
                }
            } catch (error) {
                console.error(`Error fetching collection data:`, error);
            }
            setIsLoading(false);
        }

        fetchEntityData();
    }, []);

    return (
        <main className="main-section">
            <div className="entity-view">
                {isLoading ? (
                    <Loader />
                ) : (
                    <>
                        Name: {entityData.name} <br />
                        Description: {entityData.description} <br />
                        {/* Phone: {entityData.phone} <br /> */}
                        <Link
                            to={`/collections/${id}/edit`}
                            style={{ textDecoration: "none" }}
                        >
                            <div class="post-title"> EDIT</div>
                        </Link>
                        <button onClick={showConfirmationDialog}>
                             Delete Collection
                         </button>
                         {isConfirmationDialogVisible && (
                            <DeleteConfirmationDialog
                                onConfirm={(event) => {
                                    event.preventDefault();
                                    deleteCollectionData(entityData.id);
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

export default CollectionView;
