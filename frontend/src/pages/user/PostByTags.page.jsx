import { useNavigate, useParams } from "react-router-dom";
import BlogLayout from "../../components/Layouts/BlogLayout.component";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance.util";
import { API_PATHS } from "../../utils/apiPaths.util";
import moment from "moment";
import BlogPostCard from "../../components/Cards/BlogPostCard.component";
import TrendingPosts from "../../sections/Trendings/TrendingPosts.section";

const PostByTags = () => {
  const navigate = useNavigate();
  const { tagName } = useParams();

  const [blogPostList, setBlogPostList] = useState([]);

  const getPostsByTag = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.POST.GET_POST_BY_TAG(tagName)
      );
      setBlogPostList(response.data?.length > 0 ? response.data : []);
    } catch (error) {
      console.error("Error fetching posts: ", error);
    }
  };

  const handleClick = (post) => {
    navigate(`/${post.slug}`);
  };

  useEffect(() => {
    getPostsByTag();
    return () => {};
  }, [tagName]);
  return (
    <BlogLayout>
      <div>
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-12 md:col-span-9">
            <div className="flex items-center justify-center bg-linear-to-r from-sky-50 via-teal-50 to-cyan-100 h-32 p-6 rounded">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-sky-900">
                  # {tagName}
                </h3>
                <p className="text-sm font-medium text-gray-700 mt-1">
                  Showing {blogPostList.length}{" "}
                  {blogPostList.length === 1 ? "post" : "posts"} tagged with #
                  {tagName}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {blogPostList.length > 0 &&
                blogPostList.map((item) => (
                  <BlogPostCard
                    key={item._id}
                    title={item.title}
                    coverImageUrl={item.coverImageUrl}
                    content={item.content}
                    tags={item.tags}
                    updatedAt={
                      item.updatedAt
                        ? moment(item.updatedAt).format("Do MMM YYYY")
                        : "-"
                    }
                    authorName={item.author.name}
                    authorProfilePicture={item.author.profileImageUrl}
                    onClick={() => handleClick(item)}
                  />
                ))}
            </div>
          </div>
          <div className="col-span-12 md:col-span-3">
            <TrendingPosts />
          </div>
        </div>
      </div>
    </BlogLayout>
  );
};

export default PostByTags;
