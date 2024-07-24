import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login/index";
import EntryApp from "../pages/EntryApp/index";
import BaseApp from "../pages/BaseApp/index";
import Notes from "../pages/Notes/index";
import PageNotFound from "../pages/PageNotFound/index";
import Authorized from "../utils/Authorized";
import Settings from "../pages/Settings";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<EntryApp />} >
                    <Route path="/" element={<Login />} />
                    <Route path="*" element={<PageNotFound />} />
                </Route>

                <Route element={<Authorized />}>
                    <Route path="/" element={<BaseApp />} >
                        <Route path="/notes" element={<Notes />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="*" element={<PageNotFound />} />
                    </Route>
                </Route>

                <Route path="*" element={<PageNotFound />} />

            </Routes>
        </BrowserRouter>
    )
}