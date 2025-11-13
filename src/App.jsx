import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Layout from "./components/Layout";
import ApplicationForm from "./components/ApplicationForm";
import ApplicationPage from "./pages/ApplicationPage";

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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
