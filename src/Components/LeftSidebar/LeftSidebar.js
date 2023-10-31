// import React from "react";
import "../../styles/LeftSidebar.css";
import ProfileLinkElement from "./ProfileLinkElement";

function LeftSidebar() {
    return (
        <div className="left-sidebar">
            <ul>
                <ProfileLinkElement />
                {/* <li><a href="#">Link 1</a></li> */}
                {/* <li><a href="#">Link 2</a></li> */}
                {/* Add more links as needed */}
            </ul>
        </div>
    );
}

export default LeftSidebar;
