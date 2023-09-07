import React from 'react';
import { Outlet } from "react-router-dom";
import "../styles/Account.css";

export default function Account() {
    return (
        <div>
            <Outlet />
        </div>
    );
}
