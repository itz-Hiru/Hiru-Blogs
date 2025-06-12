import { useContext } from "react";
import { UserContext } from "../../context/userContext.context";
import { useNavigate } from "react-router-dom";

const ProfileInfoCard = () => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/");
  };
  return (
    <div className="flex flex-col md:flex-row items-center">
      <img
        src={user.profileImageUrl}
        alt="Profile Photo"
        className="w-11 h-11 bg-black/40 rounded-full mr-3 mb-3 md:mb-0"
      />
      <div className="flex flex-col items-center md:items-start">
        <div className="text-[15px] text-black font-medium">
          {user.name || ""}
        </div>
        <button
          type="button"
          className="text-red-600 text-sm font-medium cursor-pointer hover:underline mt-1 md:mt-0"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfoCard;
