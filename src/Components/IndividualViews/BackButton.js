import React from "react";
import { Link, useLocation } from "react-router-dom";

const BackButton = () => {
    const location = useLocation();
    const pathname = location.pathname;

    let feedPath;
    let feedText;

    // Determine the feed path and text based on the current route
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
    } else {
        // Default to a feed path and text of your choice
        feedPath = "/default-feed";
        feedText = "Default Feed";
    }

    return (
        <Link to={feedPath} style={{ textDecoration: "none" }}>
            <div className="back-button">
                &lt; Back to {feedText}
            </div>
        </Link>
    );
};

export default BackButton;
