import { Route, Routes } from "react-router-dom";

import RequireAuth from "./RequireAuth";
import AdminPage from "../pages/Admin/AdminPage";
import Login from "../pages/Client/Login";

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<AdminPage />} />

      {/* Protected route */}
      {/* <Route
        path="/*"
        element={
          <RequireAuth>
            <AdminPage />
          </RequireAuth>
        }
      /> */}
    </Routes>
  );
}

export default AdminRoutes;
