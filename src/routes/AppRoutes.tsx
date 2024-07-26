import { BrowserRouter, Routes, Route } from "react-router-dom";
import EntryApp from "../pages/EntryApp";
import Login from "../pages/Login";
import Authorized from "../utils/Authorized";
import BaseApp from "../pages/BaseApp";
import Notes from "../pages/Notes";
import EditNote from "../pages/EditNote";
import CreateNote from "../pages/CreateNote";
import Settings from "../pages/Settings";
import PageNotFound from "../pages/PageNotFound";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Rotas públicas */}
                <Route path="/" element={<EntryApp />} >
                    <Route index element={<Login />} />
                    <Route path="*" element={<PageNotFound />} />
                </Route>

                {/* Rotas protegidas */}
                <Route element={<Authorized />}>
                    <Route path="/" element={<BaseApp />}>
                        <Route path="Notes" element={<Notes />} />
                        <Route path="Note/:id" element={<EditNote />} />
                        <Route path="AddNote" element={<CreateNote />} />
                        <Route path="Settings" element={<Settings />} />
                        <Route path="*" element={<PageNotFound />} />
                    </Route>
                </Route>

                {/* Rota de página não encontrada global */}
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    );
}
