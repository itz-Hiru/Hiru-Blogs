import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LuSearch } from "react-icons/lu";
import ProfileInfoCard from "../Cards/ProfileInfoCard.component";
import toast from "react-hot-toast";
import { UserContext } from "../../context/userContext.context";
import Modal from "../Modals/Modal.component";
import SignUp from "../../pages/authentication/SignUp.page";
import Login from "../../pages/authentication/Login.page";

const BlogNavbar = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [query, setQuery] = useState("");
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleSearch = async () => {
    if (!query) {
      toast.error("Please enter something to search");
      return;
    }
    setQuery("");
    navigate(`/search?query=${query}`);
  };

  return (
    <>
      <div className="bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-5 md:px-16 lg:px-24 xl:px-32">
        <div className="flex items-center justify-between gap-5">
          <div className="flex">
            <Link to="/" className="cursor-default">
              <span className="font-header text-2xl text-black text-bold">
                Hiru Blogs
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-10">
            <div className="flex items-center space-x-2">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={query}
                  onChange={({ target }) => setQuery(target.value)}
                  placeholder="Search..."
                  className="pl-4 pr-10 py-2 w-[200px] md:w-[250px] lg:w-[300px] border border-gray-300 rounded-lg outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-sky-500 transition duration-200"
                />
                <button
                  type="button"
                  onClick={handleSearch}
                  className="absolute right-0 top-0 bottom-0 px-3 flex items-center justify-center text-white bg-sky-500 hover:bg-sky-600 rounded-r-lg transition duration-200"
                >
                  <LuSearch className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="hidden md:block">
              {user ? (
                <ProfileInfoCard />
              ) : (
                <button
                  className="bg-primary hover:bg-secondary text-[#FFFFFF] font-semibold px-8 py-2.5 rounded-full transition-all duration-500 cursor-default"
                  onClick={() => setOpenAuthModal(true)}
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
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
    </>
  );
};

export default BlogNavbar;
