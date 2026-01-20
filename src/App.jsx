import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Layout from "./components/Layout";
import ApplicationPage from "./pages/ApplicationPage";

import AdminLayout from "./pages/Admin Pages/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import ApplicantsTable from "./pages/Admin Pages/ApplicantsTable";
import HouseholdTable from "./pages/Admin Pages/HouseholdTable";
import ResidentsTable from "./pages/Admin Pages/ResidentsTable";
import PetsTable from "./pages/Admin Pages/PetsTable";

function App() {
  return (
    <>
      <BrowserRouter>
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
            <Route path="households" element={<HouseholdTable />} />
            <Route path="residents" element={<ResidentsTable />} />
            <Route path="pets" element={<PetsTable />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
