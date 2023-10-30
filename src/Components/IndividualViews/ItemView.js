import React, { useState, useEffect, useContext } from "react";
import Loader from "../Loader";
import { useNavigate, useParams } from "react-router-dom";
import DataContext from "../../DataContext";
import { Link } from "react-router-dom";
import DeleteConfirmationDialog from "../Forms/DeleteConfirmationDialog";
import BackButton from "./BackButton";

function ItemView() {
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
    const { items, setItems, API_BASE_URL, userDetails } = useContext(DataContext);

    const deleteItemData = (id) => {
        fetch(`${API_BASE_URL}/items/${id}`, {
            method: "DELETE",
            credentials: 'include'
        })
            .then((response) => {
                if (response.ok) {
                    setItems((prevItems) =>
                        prevItems.filter((item) => item.id !== id)
                    );
                }
            })
            .catch((error) => {
                console.error("Error deleting item:", error);
            });
        navigate(`/items`, {});
    };

    useEffect(() => {
        async function fetchEntityData() {
            try {
                const response = await fetch(`${API_BASE_URL}/items/${id}`, {
                    method: 'GET',
                    credentials: 'include'
                });
                if (response.ok) {
                    const data = await response.json();
                    setEntityData(data);
                }
            } catch (error) {
                console.error(`Error fetching item data:`, error);
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
                        Designer: {entityData.designerName} <br />
                        Image:         {entityData.imageUrl && <img src={entityData.imageUrl} alt={entityData.name} />} {/* Display the image */}

                        {userDetails && isOwner ? (
                            <Link
                                to={`/items/${id}/edit`}
                                style={{ textDecoration: "none" }}
                            >
                                <div className="post-title"> EDIT</div>
                            </Link>
                        ) : null}
                        
                        {userDetails && isOwner ? (
                            <button onClick={showConfirmationDialog}>
                                Delete Item
                            </button>
                        ) : null}
                        
                        {isConfirmationDialogVisible && (
                            <DeleteConfirmationDialog
                                onConfirm={(event) => {
                                    event.preventDefault();
                                    deleteItemData(entityData.id);
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

export default ItemView;
