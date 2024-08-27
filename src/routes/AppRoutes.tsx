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
import CreateAccount from "../pages/CreateAccount";
import RecoveryAccount from "../pages/RecoveryAccount";
import Note from "../pages/Note";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Rotas públicas */}
                <Route path="/" element={<EntryApp />} >
                    <Route index element={<Login />} />
                    <Route path="AddAccount" element={<CreateAccount />} />
                    <Route path="RecoveryAccount" element={<RecoveryAccount />} />
                    <Route path="Note/:id" element={<Note />} />
                    <Route path="*" element={<PageNotFound />} />
                </Route>

                {/* Rotas protegidas */}
                <Route element={<Authorized />}>
                    <Route path="/" element={<BaseApp />}>
                        <Route path="Notes" element={<Notes />} />
                        <Route path="EditNote/:id" element={<EditNote />} />
                        <Route path="CreateNote" element={<CreateNote />} />
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
