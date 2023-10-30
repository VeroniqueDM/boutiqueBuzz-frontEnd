import React, { useState, useEffect, useContext } from "react";
import Loader from "../Loader";
import { useNavigate, useParams } from "react-router-dom";
import DataContext from "../../DataContext";
import { Link } from "react-router-dom";
import DeleteConfirmationDialog from "../Forms/DeleteConfirmationDialog";
import BackButton from "./BackButton";

function CollectionView() {
    const { id } = useParams();
    const [isConfirmationDialogVisible, setIsConfirmationDialogVisible] = useState(false);
    const showConfirmationDialog = () => {
        setIsConfirmationDialogVisible(true);
    };
    const navigate = useNavigate();
    const hideConfirmationDialog = () => {
        setIsConfirmationDialogVisible(false);
    };
    
    const [entityData, setEntityData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const { collections, setCollections, API_BASE_URL, userDetails } = useContext(DataContext);
    
    const deleteCollectionData = (id) => {
        fetch(`${API_BASE_URL}/collections/${id}`, {
            method: "DELETE",
            credentials: 'include'
        })
            .then((response) => {
                if (response.ok) {
                    setCollections((prevCollections) =>
                        prevCollections.filter((collection) => collection.id !== id)
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
                const response = await fetch(`${API_BASE_URL}/collections/${id}`, {
                    method: 'GET',
                    credentials: 'include'
                });
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

    const isOwner = entityData.ownerId === userDetails.id;

    return (
        <main className="main-section">
                        <BackButton/>

            <div className="entity-view">
                {isLoading ? (
                    <Loader />
                ) : (
                    <>
                        Name: {entityData.name} <br />
                        Description: {entityData.description} <br />
                        
                        {userDetails && isOwner ? (
                            <Link
                                to={`/collections/${id}/edit`}
                                style={{ textDecoration: "none" }}
                            >
                                <div className="post-title"> EDIT</div>
                            </Link>
                        ) : null}
                        {userDetails && isOwner ? (
                            <button onClick={showConfirmationDialog}>
                                Delete Collection
                            </button>
                        ) : null}
                        
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
