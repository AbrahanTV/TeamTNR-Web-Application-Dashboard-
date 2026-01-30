import { BrowserRouter, HashRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Layout from "./components/Layout";
import ApplicationPage from "./pages/ApplicationPage";

import AdminLayout from "./pages/Admin Pages/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import ApplicantsTable from "./pages/Admin Pages/ApplicantsTable";
import ApplicantDetail from "./pages/Admin Pages/ApplicantDetail";
import HouseholdTable from "./pages/Admin Pages/HouseholdTable";
import ResidentsTable from "./pages/Admin Pages/ResidentsTable";
import PetsTable from "./pages/Admin Pages/PetsTable";

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="contact" element={<Contact />} />
            <Route path="application-page" element={<ApplicationPage />} />
          </Route>

          {/* ADMIN ROUTES */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="applicants" element={<ApplicantsTable />} />
            <Route path="applicants/:id" element={<ApplicantDetail />} />
            <Route path="households" element={<HouseholdTable />} />
            <Route path="residents" element={<ResidentsTable />} />
            <Route path="pets" element={<PetsTable />} />
          </Route>
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
