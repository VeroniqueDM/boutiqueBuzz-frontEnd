import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import DataContext from "../../DataContext";
import Loader from "../Loader";

function ProfileLinkElement() {
    const { userDetails } = useContext(DataContext);

    if (!userDetails) {
        // Display a loader while userDetails are being fetched
        return <Loader />;
    }

    return (
        <Link
            to={`/view/profile/${userDetails.id}`}
            style={{ textDecoration: "none" }}
        >
            <div className="header-link">Profile</div>
        </Link>
    );
}

export default ProfileLinkElement;
