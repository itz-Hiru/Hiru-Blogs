import { useContext, useEffect, useState } from "react";
import DashboardLayout from "../../components/Layouts/DashboardLayout.component";
import { UserContext } from "../../context/userContext.context";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import axiosInstance from "../../utils/axiosInstance.util";
import { API_PATHS } from "../../utils/apiPaths.util";
import { LuChartLine, LuCheckCheck, LuGalleryVerticalEnd, LuHeart } from "react-icons/lu";
import DashboardSummaryCard from "../../components/Cards/DashboardSummaryCard.component";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [maxViews, setMaxViews] = useState(0);

  const getDashboardData = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.DASHBOARD.GET_DASHBOARD_DATA
      );
      if (response.data) {
        setDashboardData(response.data);

        const topPosts = response.data?.topPosts || [];
        const totalViews = Math.max(...topPosts.map((p) => p.views), 1);
        setMaxViews(totalViews);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const getTimeBasedGreeting = () => {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) return "Good Morning!";
    if (currentHour >= 12 && currentHour < 17) return "Good Afternoon!";
    if (currentHour >= 17 && currentHour < 21) return "Good Evening!";
    return "Good Night!";
  };

  useEffect(() => {
    getDashboardData();
    return () => {};
  }, []);
  return (
    <DashboardLayout activeMenu="Dashboard">
      {dashboardData && (
        <>
          <div className="bg-white p-6 rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50 mt-6">
            <div className="">
              <div className="col-span-3">
                <h2 className="text-[16px] md:text-xl font-semibold text-black">
                  {getTimeBasedGreeting()} {user.name}
                </h2>
                <p className="text-xs md:text-[13px] font-medium text-gray-400 mt-1.5">
                  {moment().format("dddd MMM YYYY")}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mt-5">
              <DashboardSummaryCard 
                icon={<LuGalleryVerticalEnd />}
                label="Total Posts"
                value={dashboardData?.stats?.totalPosts || 0}
                bg-color="bg-sky-100/60"
                color="text-sky-500"
              />
              <DashboardSummaryCard 
                icon={<LuCheckCheck />}
                label="Published"
                value={dashboardData?.stats?.published || 0}
                bg-color="bg-sky-100/60"
                color="text-sky-500"
              />
              <DashboardSummaryCard 
                icon={<LuChartLine />}
                label="Total Views"
                value={dashboardData?.stats?.totalViews || 0}
                bg-color="bg-sky-100/60"
                color="text-sky-500"
              />
              <DashboardSummaryCard 
                icon={<LuHeart />}
                label="Total Likes"
                value={dashboardData?.stats?.totalLikes || 0}
                bg-color="bg-sky-100/60"
                color="text-sky-500"
              />
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  );
};

export default Dashboard;
