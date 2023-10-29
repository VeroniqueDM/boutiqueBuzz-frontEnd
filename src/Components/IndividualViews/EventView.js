import React, { useState, useEffect, useContext } from "react";
import Loader from "../Loader";
import { useNavigate, useParams } from "react-router-dom";
import DataContext from "../../DataContext";
import { Link } from "react-router-dom";
import DeleteConfirmationDialog from "../Forms/DeleteConfirmationDialog";

function EventView() {
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
    const { events, setEvents, API_BASE_URL, userDetails, setUserDetails } =
        useContext(DataContext);
    const formattedEventDate = new Date(
        entityData.eventDate
    ).toLocaleDateString();
    // const isOwner = entityData.ownerId === userDetails.id;
    const deleteEventData = (id) => {
        fetch(`${API_BASE_URL}/events/${id}`, {
            method: "DELETE",
            credentials: 'include'
        })
            .then((response) => {
                if (response.ok) {
                    setEvents((prevEvents) =>
                        prevEvents.filter((event) => event.id !== id)
                    );
                }
            })
            .catch((error) => {
                console.error("Error deleting event:", error);
            });
        navigate(`/events`, {});
    };
    useEffect(() => {
        async function fetchEntityData() {
            try {
                const response = await fetch(`${API_BASE_URL}/events/${id}`,
                { method: 'GET',  credentials: 'include' }
                );
                if (response.ok) {
                    const data = await response.json();
                    setEntityData(data);

                }
            } catch (error) {
                console.error(`Error fetching event data:`, error);
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
                        Title: {entityData.title} <br />
                        Description: {entityData.description} <br />
                        Date: {formattedEventDate} <br />
                        {/* {userDetails && isOwner ? ( */}
                           <Link
                           to={`/events/${id}/edit`}
                           style={{ textDecoration: "none" }}
                       >
                           <div class="post-title"> EDIT</div>
                       </Link>
                       
                        {/* ) : null} */}
                        {/* <Link
                            to={`/events/${id}/edit`}
                            style={{ textDecoration: "none" }}
                        >
                            <div class="post-title"> EDIT</div>
                        </Link> */}
                             {/* {userDetails && isOwner ? ( */}
                             <button onClick={showConfirmationDialog}>
                             Delete Event
                         </button>
                       
                        {/* ) : null} */}
             
                        {isConfirmationDialogVisible && (
                            <DeleteConfirmationDialog
                                onConfirm={(event) => {
                                    event.preventDefault();
                                    deleteEventData(entityData.id);
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

export default EventView;
