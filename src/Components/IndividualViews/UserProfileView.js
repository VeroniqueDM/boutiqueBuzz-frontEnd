import React, { useState, useEffect, useContext } from "react";
import Loader from "../Loader";
import { useParams } from "react-router-dom";
import DataContext from "../../DataContext";
import BackButton from "./BackButton";

function UserProfileView() {
    const { id } = useParams();
    // const [entityData, setEntityData] = useState({});
    // const [isLoading, setIsLoading] = useState(true);
    const { users, API_BASE_URL, userDetails } = useContext(DataContext);

    // useEffect(() => {
    //     async function fetchEntityData() {
    //         try {
    //             const response = await fetch(`${API_BASE_URL}/users/${id}`, {
    //                 method: "GET",
    //                 credentials: "include",
    //             });
    //             if (response.ok) {
    //                 const data = await response.json();
    //                 setEntityData(data);
    //             }
    //         } catch (error) {
    //             console.error(`Error fetching user data:`, error);
    //         }
    //         setIsLoading(false);
    //     }

    //     fetchEntityData();
    // }, [API_BASE_URL, id]);

    return (
        <main className="main-section">
            <BackButton />

            <div className="entity-view">
                {/* {isLoading ? (
                    <Loader />
                ) : ( */}
                    <>
                        <h2>User Profile</h2>
                        Name: {userDetails.name} <br />
                        Username: {userDetails.username} <br />
                        Email: {userDetails.email} <br />
                    </>
                {/* )} */}
            </div>
        </main>
    );
}

export default UserProfileView;
