import React, { useState, useEffect, useContext } from "react";
import Loader from "../Loader";
import { useNavigate, useParams } from "react-router-dom";
import DataContext from "../../DataContext";
import { Link } from "react-router-dom";
import DeleteConfirmationDialog from "../Forms/DeleteConfirmationDialog";
import BackButton from "./BackButton";

function CategoryView() {
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
    const {
        categories,
        setCategories,
        API_BASE_URL,
        userDetails,
        setUserDetails,
    } = useContext(DataContext);

    const formattedCategoryDate = new Date(
        entityData.categoryDate
    ).toLocaleDateString();

    const deleteCategoryData = (id) => {
        fetch(`${API_BASE_URL}/categories/${id}`, {
            method: "DELETE",
            credentials: "include",
        })
            .then((response) => {
                if (response.ok) {
                    setCategories((prevCategories) =>
                        prevCategories.filter((category) => category.id !== id)
                    );
                }
            })
            .catch((error) => {
                console.error("Error deleting category:", error);
            });
        navigate(`/categories`, {});
    };

    useEffect(() => {
        async function fetchEntityData() {
            try {
                const response = await fetch(
                    `${API_BASE_URL}/categories/${id}`,
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );
                if (response.ok) {
                    const data = await response.json();
                    setEntityData(data);
                }
            } catch (error) {
                console.error(`Error fetching category data:`, error);
            }
            setIsLoading(false);
        }

        fetchEntityData();
    }, []);

    return (
        <main className="main-section">
            <BackButton />

            <div className="entity-view">
                {isLoading ? (
                    <Loader />
                ) : (
                    <>
                        Name: {entityData.name} <br />
                        Description: {entityData.description} <br />
                        Date: {formattedCategoryDate} <br />
                        <Link
                            to={`/categories/${id}/edit`}
                            style={{ textDecoration: "none" }}
                        >
                            <div class="post-title"> EDIT</div>
                        </Link>
                        <button onClick={showConfirmationDialog}>
                            Delete Category
                        </button>
                        {isConfirmationDialogVisible && (
                            <DeleteConfirmationDialog
                                onConfirm={(event) => {
                                    event.preventDefault();
                                    deleteCategoryData(entityData.id);
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

export default CategoryView;
