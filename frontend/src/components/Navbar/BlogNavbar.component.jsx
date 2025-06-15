import { useState } from "react";
import { Link } from "react-router-dom";
import { LuSearch } from "react-icons/lu";
import ProfileInfoCard from "../Cards/ProfileInfoCard.component";

const BlogNavbar = () => {
  const [openSearchBar, setOpenSearchBar] = useState(false);
  return (
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
          <button
            type="button"
            className="hover:text-sky-500 cursor-pointer"
            onClick={() => setOpenSearchBar(true)}
          >
            <LuSearch className="text-[22px]" />
          </button>
          <div className="hidden md:block">
            <ProfileInfoCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogNavbar;
