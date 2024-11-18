import { Navigate, Route, Routes } from "react-router";
import PageError from "../app/PageError";
import DashboardUser from "../layout/dashboard/DashboardUser";
import PageSubtitlesEditor from "../subtitlesEditor/PageSubtitlesEditor";

export default function UnauthenticatedRoutes() {
  return (
    <DashboardUser>
      <Routes>
        <Route
          path="/subtitles-editor"
          element={<PageSubtitlesEditor />}
        />

        <Route
          path="/"
          element={<Navigate to="/subtitles-editor" />}
        />

        <Route
          path="*"
          element={<PageError targetPage="subtitles-editor" />}
        />
      </Routes>
    </DashboardUser>
  );
}
