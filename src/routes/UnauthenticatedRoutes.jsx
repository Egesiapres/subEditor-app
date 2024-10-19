import { Route, Routes } from "react-router";
import PageError from "../app/PageError";
import DashboardUser from "../layout/dashboard/DashboardUser";
import PageSubtitleEditor from "../subtitleEditor/PageSubtitleEditor";

export default function UnauthenticatedRoutes() {
  return (
    <DashboardUser>
      <Routes>
        <Route
          path="/subtitle-editor"
          element={<PageSubtitleEditor />}
        />

        <Route
          path="*"
          element={<PageError targetPage="subtitle-editor" />}
        />
      </Routes>
    </DashboardUser>
  );
}
