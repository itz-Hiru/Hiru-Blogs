import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance.util";
import { API_PATHS } from "../../utils/apiPaths.util";
import TrendingPostCard from "../../components/Cards/TrendingPostCard.component";

const TrendingPosts = () => {
  const navigate = useNavigate();

  const [postList, setPostList] = useState([]);

  // Fetch trending posts
  const getTrendingPosts = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.POST.GET_TRENDING_POSTS
      );

      setPostList(response.data?.length > 0 ? response.data : []);
    } catch (error) {
      console.error("Error fetching trending posts: ", error);
    }
  };

  useEffect(() => {
    getTrendingPosts();
    return () => {};
  }, []);

  const handleClick = (post) => {
    navigate(`/${post.slug}`);
  };
  return (
    <div>
      <h4 className="text-base md:text-xl text-black font-semibold mb-3">
        Trending Posts
      </h4>
      {postList.length > 0 &&
        postList.map((item) => (
          <TrendingPostCard
            key={item._id}
            title={item.title}
            coverImage={item.coverImageUrl}
            tags={item.tags}
            onClick={() => handleClick(item)}
          />
        ))}
    </div>
  );
};

export default TrendingPosts;
