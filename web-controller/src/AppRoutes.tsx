import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Issue } from "./pages/Issue";
import { VerifyVC } from "./pages/Verify";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Issue />} />
        <Route path="/verify" element={<VerifyVC />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
