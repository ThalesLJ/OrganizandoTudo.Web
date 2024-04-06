import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../src/pages/Login/index.tsx";
import EntryApp from "./pages/EntryApp/index.tsx";
import BaseApp from "./pages/BaseApp/index.tsx";
import Notes from "./pages/Notes/index.tsx";
import PageNotFound from "./pages/PageNotFound/index.tsx";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<EntryApp />} >
                    <Route path="/" element={<Login />} />
                    <Route path="*" element={<PageNotFound />} />
                </Route>

                <Route path="/" element={<BaseApp />} >
                    <Route path="/notes" element={<Notes />} />
                    <Route path="*" element={<PageNotFound />} />
                </Route>

                <Route path="*" element={<PageNotFound />} />

            </Routes>
        </BrowserRouter>
    )
}