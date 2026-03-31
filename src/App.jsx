import {
  BrowserRouter,
  HashRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Layout from "./components/Layout";
// import ApplicationPage from "./pages/ApplicationPage";

import AdminLayout from "./pages/Admin Pages/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import ApplicantsTable from "./pages/Admin Pages/ApplicantsTable";
import ApplicantDetail from "./pages/Admin Pages/ApplicantDetail";
import HouseholdTable from "./pages/Admin Pages/HouseholdTable";
import ResidentsTable from "./pages/Admin Pages/ResidentsTable";
import PetsTable from "./pages/Admin Pages/PetsTable";
import CurrentPetsTable from "./pages/Admin Pages/CurrentPetsTable";
import LifestyleTable from "./pages/Admin Pages/LifestyleTable";
import ReferencesTable from "./pages/Admin Pages/ReferencesTable";
import AgreementTable from "./pages/Admin Pages/AgreementTable";
// import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Redirect root to admin */}
        <Route path="/" element={<Navigate to="/admin" replace />} />

        {/* ADMIN ROUTES */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="applicants" element={<ApplicantsTable />} />
          <Route path="applicants/:id" element={<ApplicantDetail />} />
          <Route path="households" element={<HouseholdTable />} />
          <Route path="residents" element={<ResidentsTable />} />
          <Route path="pets" element={<PetsTable />} />
          <Route path="current_pets" element={<CurrentPetsTable />} />
          <Route path="lifestyle" element={<LifestyleTable />} />
          <Route path="references" element={<ReferencesTable />} />
          <Route path="agreement" element={<AgreementTable />} />
        </Route>
      </Routes>
    </HashRouter>
    // <AuthProvider></AuthProvider>
  );
}

export default App;
