import React, { useState } from "react";
import showErrorOrConclude from "../../../config/showErrorOrConclude";
import { baseApiUrl, userKey } from "../../../globals";

import "./Auth.css"

export default function Auth() {
    const [showSignUp, setSignUp] = useState(false)

    return (
        <div className="auth-content">
            <div className="auth-modal">

            </div>
        </div>
    )
}