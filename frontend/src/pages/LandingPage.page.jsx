import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar.component";
import Modal from "../components/Modals/Modal.component";
import Login from "./authentication/Login.page";
import SignUp from "./authentication/SignUp.page";
import Footer from "../components/Footer/Footer.component";
import Hero from "../sections/Hero/Hero.section";
import TopCharts from "../sections/TopCharts/TopCharts.section";
import Testimonials from "../sections/Testimonials/Testimonials.section";
import About from "../sections/About/About.section";
import { UserContext } from "../context/userContext.context";

const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {};
  return (
    <div>
      <Navbar onClick={() => setOpenAuthModal(true)} user={user}/>
      <img
        src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/gradientBackground.png"
        alt=""
        className="absolute top-0 left-0 h-[100vh] object-cover z-0"
      />
      <div className="relative z-10">
        <div className="md:px-16 lg:px-24 xl:px-32">
          <Hero onClick={handleCTA} />
          <About />
          <TopCharts />
          <Testimonials />
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
