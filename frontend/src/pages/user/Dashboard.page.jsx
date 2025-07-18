import { useNavigate } from "react-router-dom";
import BlogLayout from "../../components/Layouts/BlogLayout.component";
import { useEffect, useState } from "react";
import moment from "moment";
import axiosInstance from "../../utils/axiosInstance.util";
import { API_PATHS } from "../../utils/apiPaths.util";
import { LuGalleryVerticalEnd, LuLoaderCircle } from "react-icons/lu";
import FeaturedBlogPost from "../../components/Cards/FeaturedBlogPost.component";
import BlogPostCard from "../../components/Cards/BlogPostCard.component";
import TrendingPosts from "../../sections/Trendings/TrendingPosts.section";

const UserDashboard = () => {
  const navigate = useNavigate();

  const [blogPostList, setBlogPostList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch paginated posts
  const getAllPosts = async (pageNumber = 1) => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(API_PATHS.POST.GET_ALL, {
        params: { status: "published", page: pageNumber },
      });

      const { posts, totalPages } = response.data;

      setBlogPostList((prevPosts) =>
        pageNumber === 1 ? posts : [...prevPosts, ...posts]
      );

      setTotalPages(totalPages);
      setPage(pageNumber);
    } catch (error) {
      console.error("Error while fetching posts: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Load more posts
  const handleLoadMore = () => {
    if (page < totalPages) {
      getAllPosts(page + 1);
    }
  };

  // Initial load
  useEffect(() => {
    getAllPosts(1);
  }, []);

  const handleClick = (post) => {
    navigate(`/${post.slug}`);
  };
  return (
    <BlogLayout>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 md:col-span-9">
          {blogPostList.length > 0 && (
            <FeaturedBlogPost 
              title={blogPostList[0].title}
              coverImageUrl={blogPostList[0].coverImageUrl}
              content={blogPostList[0].content}
              tags={blogPostList[0].tags}
              updatedAt={blogPostList[0].updatedAt ? moment(blogPostList[0].updatedAt).format("Do MMM YYYY") : "-"}
              authorName={blogPostList[0].author.name}
              authorProfilePicture={blogPostList[0].author.profileImageUrl}
              onClick={() => handleClick(blogPostList[0])}
            />
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {blogPostList.length > 0 && blogPostList.slice(1).map((item) => (
              <BlogPostCard 
                key={item._id}
                title={item.title}
                coverImageUrl={item.coverImageUrl}
                content={item.content}
                tags={item.tags}
                updatedAt={item.updatedAt ? moment(item.updatedAt).format("Do MMM YYYY") : "-"}
                authorName={item.author.name}
                authorProfilePicture={item.author.profileImageUrl}
                onClick={() => handleClick(item)}
              />
            ))}
          </div>
          {page < totalPages && (
            <div className="flex items-center justify-center mt-5">
              <button
                type="button"
                className="flex items-center gap-3 text-sm text-white font-medium bg-black px-7 py-2.5 mt-6 rounded-full text-nowrap hover:scale-105 transition-all duration-300 cursor-pointer"
                disabled={isLoading}
                onClick={handleLoadMore}
              >
                {isLoading ? (
                  <LuLoaderCircle className="animate-spin text-[15px]" />
                ) : (
                  <LuGalleryVerticalEnd className="text-lg" />
                )}
                {isLoading ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </div>
        <div className="col-span-12 md:col-span-3">
          <TrendingPosts />
        </div>
      </div>
    </BlogLayout>
  );
};

export default UserDashboard;
