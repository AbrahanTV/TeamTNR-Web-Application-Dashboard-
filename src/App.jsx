import { HashRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import ApplyPage from "./pages/ApplyPage";
import Layout from "./components/Layout";

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="contact" element={<Contact />} />
            <Route path="adoption-form" element={<ApplyPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
