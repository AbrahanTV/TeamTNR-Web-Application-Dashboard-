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
            <Route path="household" element={<HouseholdTable />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
