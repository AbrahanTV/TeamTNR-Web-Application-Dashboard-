import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Layout from "./components/Layout";
import ApplicationPage from "./pages/ApplicationPage";
import AdminPanel from "./pages/AdminPanel";
import ApplicantsTable from "./pages/ApplicantsTable";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="contact" element={<Contact />} />
            <Route path="/application-page" element={<ApplicationPage />} />
          </Route>

          {/* ADMIN ROUTE */}
          <Route path="/admin-panel" element={<AdminPanel />} />
          <Route path="/applicants" element={<ApplicantsTable />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
