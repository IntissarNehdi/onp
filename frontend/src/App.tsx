import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/website/navbar/NavBar";
import { UserProvider } from "./contexts/UserContext";
import Footer from "./components/website/footer/Footer";
import Content from "./components/website/content/Content";
import LoginPage from "./components/login/LoginPage";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import imagePath from "./assets/logotu.png";
import Dashboard from "./components/login/Dashboard";

// A component to conditionally render Navbar and Footer
const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  const showNavbarFooter = location.pathname !== "/login";

  return (
    <>
      {showNavbarFooter && (
        <Navbar brandName="Hochschulwahl" imageScrPath={imagePath} />
      )}
      {children}
      {showNavbarFooter && <Footer />}
    </>
  );
};

function App() {
  return (
    <UserProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Content />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Layout>
      </Router>
    </UserProvider>
  );
}

export default App;