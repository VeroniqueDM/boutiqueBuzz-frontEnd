import React from "react";
import { Link, useLocation } from "react-router-dom";

const BackButton = () => {
    const location = useLocation();
    const pathname = location.pathname;

    let feedPath;
    let feedText;

    if (pathname.includes("/events")) {
        feedPath = "/events";
        feedText = "Events";
    } else if (pathname.includes("/collections")) {
        feedPath = "/collections";
        feedText = "Collections";
    } else if (pathname.includes("/items")) {
        feedPath = "/items";
        feedText = "Items";
    } else if (pathname.includes("/news")) {
        feedPath = "/news";
        feedText = "News";
        // TODO: Add the other paths
    } else {
        feedPath = "/";
        feedText = "Home";
    }

    return (
        <Link to={feedPath} style={{ textDecoration: "none" }}>
            <div className="back-button">&lt; Back to {feedText}</div>
        </Link>
    );
};

export default BackButton;
