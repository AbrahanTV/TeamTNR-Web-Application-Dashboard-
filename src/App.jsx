import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import ApplyPage from "./pages/ApplyPage";
import Layout from "./components/Layout";
import ApplicationForm from "./components/ApplicatioForm";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="contact" element={<Contact />} />
            <Route path="/application-form" element={<ApplicationForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
