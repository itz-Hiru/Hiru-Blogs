import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../context/userContext.context";
import axiosInstance from "../../utils/axiosInstance.util";
import { API_PATHS } from "../../utils/apiPaths.util";
import BlogLayout from "../../components/Layouts/BlogLayout.component";
import { LuDot, LuLoaderCircle, LuSparkles } from "react-icons/lu";
import TrendingPosts from "../../sections/Trendings/TrendingPosts.section";
import MarkdownContent from "../../components/Contents/MarkdownContent.component";
import SharePost from "../../components/Layouts/SharePost.component";
import { sanitizeMarkdown } from "../../utils/helper.util";

const BlogPostView = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  const [blogPostData, setBlogPostData] = useState(null);
  const [comments, setComments] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [openSummarizeDrawer, setOpenSummarizeDrawer] = useState(false);
  const [summaryContent, setSummaryContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchPostDetailsBySlug = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.POST.GET_POST_BY_SLUG(slug)
      );

      if (response.data) {
        const data = response.data;
        setBlogPostData(data);
        fetchCommentsByPostId(data._id);
        incrementViews(data._id);
      }
    } catch (error) {
      console.error("Error fetching post details: ", error);
    }
  };

  const fetchCommentsByPostId = async (postId) => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.COMMENTS.GET_ALL_BY_POST(postId)
      );

      if (response.data) {
        const data = response.data;
        setComments(data);
      }
    } catch (error) {
      console.error("Error fetching comments: ", error);
    }
  };

  const generateBlogPostSummary = async () => {};

  const incrementViews = async (postId) => {
    if (!postId) return;

    try {
      await axiosInstance.post(API_PATHS.POST.INCREMENT_VIEW(postId));
    } catch (error) {
      console.error("Error incrementing view");
    }
  };

  const handleCancelReply = () => {
    setReplyText("");
    setShowReplyForm(false);
  };

  const handleAddReply = async () => {};

  useEffect(() => {
    fetchPostDetailsBySlug();
    return () => {};
  }, [slug]);
  return (
    <BlogLayout>
      {blogPostData && (
        <>
          <title>{blogPostData.title}</title>
          <meta name="description" content={blogPostData.title} />
          <meta property="og:title" content={blogPostData.title} />
          <meta property="og:image" content={blogPostData.coverImageUrl} />
          <meta property="og:type" content="article" />

          <div className="grid grid-cols-12 gap-8 relative">
            <div className="col-span-12 md:col-span-8 relative">
              <h1 className="text-lg md:text-2xl font-bold mb-2 line-clamp-3">
                {blogPostData.title}
              </h1>
              <div className="flex items-center gap-1 flex-wrap mt-3 mb-5">
                <span className="text-[13px] text-gray-500 font-medium">
                  {moment(blogPostData.updatedAt || "").format("Do MMM YYYY")}
                </span>
                <LuDot className="text-xl text-gray-400" />
                <div className="flex items-center flex-wrap gap-2">
                  {blogPostData.tags.slice(0, 3).map((tag, index) => (
                    <button
                      key={index}
                      type="button"
                      className="bg-sky-200/50 text-sky-800/80 text-xs font-medium px-3 py-0.5 rounded-full text-nowrap cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/tags/${tag}`);
                      }}
                    >
                      # {tag}
                    </button>
                  ))}
                </div>
                <LuDot className="text-xl text-gray-400" />
                <button
                  type="button"
                  className="flex items-center gap-2 bg-linear-to-r from-sky-500 to-cyan-400 text-xs text-white font-medium px-3 py-0.5 rounded-full text-nowrap hover:scale-[1.02] transition-all duration-300 my-1 cursor-pointer"
                  onClick={generateBlogPostSummary}
                >
                  {isLoading ? (
                    <LuLoaderCircle className="animate-spin" />
                  ) : (
                    <LuSparkles />
                  )}
                  {isLoading ? "Summarizing..." : "Summarize Post"}
                </button>
              </div>
              <img
                src={blogPostData.coverImageUrl || ""}
                alt="Cover Image"
                className="w-full h-96 object-cover mb-6 rounded-lg"
              />
              <div>
                <MarkdownContent
                  content={blogPostData?.content || ""}
                />
                <SharePost title={blogPostData.title} />
              </div>
            </div>
            <div className="col-span-12 md:col-span-4">
              <TrendingPosts />
            </div>
          </div>
        </>
      )}
    </BlogLayout>
  );
};

export default BlogPostView;
