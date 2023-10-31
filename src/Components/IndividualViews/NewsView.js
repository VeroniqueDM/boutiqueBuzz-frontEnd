import React, { useState, useEffect, useContext } from "react";
import Loader from "../Loader";
import { useNavigate, useParams } from "react-router-dom";
import DataContext from "../../DataContext";
import { Link } from "react-router-dom";
import DeleteConfirmationDialog from "../Forms/DeleteConfirmationDialog";
import BackButton from "./BackButton";

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
    const { news, setNews, API_BASE_URL, userDetails } =
        useContext(DataContext);

    const deleteNewsData = (id) => {
        fetch(`${API_BASE_URL}/news/${id}`, {
            method: "DELETE",
            credentials: "include",
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
                const response = await fetch(`${API_BASE_URL}/news/${id}`, {
                    method: "GET",
                    credentials: "include",
                });
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
    }, []);
    function formatDate(dateString) {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }
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
                    <p className="entity-published">
                    Published: {formatDate(entityData.publishedAt)}
                    </p>
                    <p className="entity-content">{entityData.content}</p>
                    
                    {userDetails && isOwner ? (
                        <Link to={`/news/${id}/edit`} className="edit-link">
                            Edit News
                        </Link>
                    ) : null}
                    {userDetails && isOwner ? (
                        <button
                            className="delete-button"
                            onClick={showConfirmationDialog}
                        >
                            Delete News
                        </button>
                    ) : null}
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
