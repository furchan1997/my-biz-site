import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Hero";
import Services from "./pages/Services";
import Contact from "./pages/About";
import Footer from "./components/Footer";
import Hero from "./pages/Hero";
import About from "./pages/About";
import Portfolio from "./pages/Portfolio";
import MyOffers from "./pages/MyOffers";

function App() {
  return (
    <div className="app min-vh-100 d-flex flex-column rtl">
      <header>
        <Navbar />
      </header>
      <main
        style={{ marginTop: "70px", marginBottom: "130px" }}
        className="d-flex flex-column justify-content-center align-items-center text-center w-75 mx-auto"
      >
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <MyOffers />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
