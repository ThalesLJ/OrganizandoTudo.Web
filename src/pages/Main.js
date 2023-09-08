import React from 'react';
import { Outlet } from "react-router-dom";
import "../styles/Main.css";

export default function Main() {
    return (
        <div className='app-background'>
            <Outlet />
        </div>
    );
}
