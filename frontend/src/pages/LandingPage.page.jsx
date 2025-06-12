import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar.component";
import Modal from "../components/Modals/Modal.component";
import Login from "./authentication/Login.page";
import SignUp from "./authentication/SignUp.page";
import Footer from "../components/Footer/Footer.component";
import Hero from "../sections/Hero/Hero.section";
import Features from "../sections/Features/Features.section";
import TopCharts from "../sections/TopCharts/TopCharts.section";
import Testimonials from "../sections/Testimonials/Testimonials.section";
import CTA from "../sections/CTA/CTA.section";

const LandingPage = () => {
  const navigate = useNavigate();

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {};
  return (
    <div>
      <Navbar onClick={() => setOpenAuthModal(true)} />
      <img
        src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/gradientBackground.png"
        alt=""
        className="absolute top-0 left-0 h-[100vh] object-cover z-0"
      />
      <div className="relative z-10">
        <div className="container mx-auto">
          <Hero onClick={handleCTA} />
          <Features />
          <TopCharts />
          <Testimonials />
          <CTA />
        </div>
        <Footer />
      </div>
      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("login");
        }}
        hideHeader
      >
        <div>
          {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
          {currentPage === "signup" && (
            <SignUp setCurrentPage={setCurrentPage} />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default LandingPage;
