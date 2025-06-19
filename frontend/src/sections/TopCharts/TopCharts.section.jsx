import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance.util";
import { API_PATHS } from "../../utils/apiPaths.util";
import { AiFillHeart } from "react-icons/ai";

const TopCharts = () => {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);

  const getTrendingPosts = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.POST.GET_TRENDING_POSTS
      );
      setPosts(response.data?.length > 0 ? response.data : []);
    } catch (error) {
      console.error("Error fetching trending posts: ", error);
    }
  };

  const handleClick = (post) => {
    navigate(`/${post.slug}`);
  };

  useEffect(() => {
    getTrendingPosts();
    return () => {};
  }, []);
  return (
    <section id="topcharts" className="min-h-[100vh] pt-22">
      <div className="flex flex-col items-center justify-center gap-2">
        <h2 className="text-2xl md:text-4xl font-bold text-shadow-2xs text-shadow-black/20">
          All-Time Favourites
        </h2>
        <p className="max-w-md text-center text-[16px] text-slate-700">
          Explore the most viewed and loved blogs that continue to inspire
          readers everywhere.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.map((post) => (
          <div
            className="bg-white border border-gray-200/50 shadow-sm shadow-gray-100 p-3 rounded-md hover:rotate-1 transition-all duration-300 cursor-pointer"
            key={post._id}
            onClick={() => handleClick(post)}
          >
            <div className="flex flex-col mt-8">
              <img
                src={post.coverImageUrl}
                alt="cover image"
                className="w-full h-40 rounded-md object-cover"
              />
              <div className="flex flex-row justify-between mt-4">
                <h2 className="text-black text-[18px] font-semibold max-w-3/4 line-clamp-3">
                  {post.title}
                </h2>
                <div className="flex flex-row items-center gap-1">
                  <AiFillHeart className="text-red-500" />
                  <span className="font-semibold">{post.likes}</span>
                </div>
              </div>
              <p className="mt-3 line-clamp-3 text-[14px] text-gray-700">
                {post.content}
              </p>
              <div className="flex flex-row gap-2 mt-2.5">
                {post.tags.slice(0, 2).map((tag, index) => (
                  <p
                    key={index}
                    className="text-sky-800/80 bg-sky-50 px-2 py-0.5 text-[12px] rounded-full"
                  >
                    # {tag}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopCharts;
