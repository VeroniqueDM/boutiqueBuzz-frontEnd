import React from "react";

function ErrorComponent({ errorMessage }) {
    return (
        <div className="error">
            <p>Error: {errorMessage}</p>
        </div>
    );
}

export default ErrorComponent;