import React, { useState, useEffect, useContext } from "react";
import Loader from "../Loader";
import { findById } from "../../Utils";
import { useNavigate, useParams } from "react-router-dom";
import DataContext from "../../DataContext";
import { Link } from "react-router-dom";
import DeleteConfirmationDialog from "../Forms/DeleteConfirmationDialog";

function ItemView() {
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
    const { items, setItems, API_BASE_URL } = useContext(DataContext);
    //   const eventData = findById(events, id);
    // const formattedEventDate = new Date(entityData.eventDate).toLocaleDateString();
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
                const response = await fetch(`${API_BASE_URL}/items/${id}`,
                { method: 'GET',  credentials: 'include' }
                );
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

    return (
        <main className="main-section">
            <div className="entity-view">
                {isLoading ? (
                    <Loader />
                ) : (
                    <>
                        Name: {entityData.name} <br />
                        Description: {entityData.description} <br />
                        Designer: {entityData.designerName} <br />
                        <Link
                            to={`/items/${id}/edit`}
                            style={{ textDecoration: "none" }}
                        >
                            <div class="post-title"> EDIT</div>
                        </Link>
                        <button onClick={showConfirmationDialog}>
                             Delete Event
                         </button>
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
