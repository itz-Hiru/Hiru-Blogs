import { useContext } from "react";
import { UserContext } from "../../context/userContext.context";
import AdminNavbar from "../Navbar/AdminNavbar.component";
import SideMenu from "../Menu/SideMenu.component";

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);
  return (
    <div className="">
      <AdminNavbar activeMenu={activeMenu} />
      {user && (
        <div className="flex">
          <div className="max-[1080px]:hidden">
            <SideMenu activeMenu={activeMenu} />
          </div>
          <div className="grow mx-5">{children}</div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
