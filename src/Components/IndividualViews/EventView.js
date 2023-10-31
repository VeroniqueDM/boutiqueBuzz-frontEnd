import React, { useState, useEffect, useContext } from "react";
import Loader from "../Loader";
import { useNavigate, useParams } from "react-router-dom";
import DataContext from "../../DataContext";
import { Link } from "react-router-dom";
import DeleteConfirmationDialog from "../Forms/DeleteConfirmationDialog";
import BackButton from "./BackButton";

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
    const deleteEventData = (id) => {
        fetch(`${API_BASE_URL}/events/${id}`, {
            method: "DELETE",
            credentials: "include",
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
                const response = await fetch(`${API_BASE_URL}/events/${id}`, {
                    method: "GET",
                    credentials: "include",
                });
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
    console.log();
    const isOwner = entityData.ownerId === userDetails.id;

    return (
        <main className="main-section view">
            <BackButton />
            <div className="entity-view">
                {isLoading ? (
                    <Loader />
                ) : (
                    <>
                        <h1 className="entity-title">{entityData.title}</h1>
                        <p className="entity-description">{entityData.description}</p>
                        <p className="entity-date">Date: {formattedEventDate}</p>
                        {userDetails && isOwner ? (
                            <Link to={`/events/${id}/edit`} className="edit-link">
                                Edit Event
                            </Link>
                        ) : null}
                        {userDetails && isOwner ? (
                            <button className="delete-button" onClick={showConfirmationDialog}>
                                Delete Event
                            </button>
                        ) : null}
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
