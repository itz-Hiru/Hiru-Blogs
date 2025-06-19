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
import Login from "../authentication/Login.page";
import SignUp from "../authentication/SignUp.page";
import CommentReplyInput from "../../components/Inputs/CommentReplyInput.component";
import Modal from "../../components/Modals/Modal.component";
import UserCommentInfoCard from "../../components/Cards/UserCommentInfoCard.component";
import toast from "react-hot-toast";
import SkeltonLoader from "../../components/Loaders/SkeltonLoader.component";
import Drawer from "../../components/Layouts/Drawer.component";
import LikeCommentButton from "../../components/Buttons/LikeCommentButton.component";

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
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

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

  const generateBlogPostSummary = async () => {
    try {
      setSummaryContent(null);
      setIsLoading(true);
      setOpenSummarizeDrawer(true);

      const aiResponse = await axiosInstance.post(
        API_PATHS.AI.GENERATE_POST_SUMMARY,
        {
          content: blogPostData.content || "",
        }
      );

      if (aiResponse.data) {
        setSummaryContent(aiResponse.data);
        toast.success("Summary generated.");
      }
    } catch (error) {
      setSummaryContent(null);
      toast.error("Failed to generate summary");
      console.error("Error while generating summary: ", error);
    } finally {
      setIsLoading(false);
    }
  };

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

  const handleAddReply = async () => {
    try {
      await axiosInstance.post(
        API_PATHS.COMMENTS.ADD_COMMENT(blogPostData._id),
        {
          content: replyText,
          parentComment: "",
        }
      );
      toast.success("Comment sent successfully.");
      setReplyText("");
      setShowReplyForm(false);
      fetchCommentsByPostId(blogPostData._id);
    } catch (error) {
      toast.error("Error sending comment");
      console.error("Error while sending comment: ", error);
    }
  };

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
                <MarkdownContent content={blogPostData?.content || ""} />
                <SharePost title={blogPostData.title} />
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold">Comments</h4>
                    <button
                      type="button"
                      className="flex items-center justify-center gap-3 bg-linear-to-r from-sky-500 to-cyan-400 text-xs font-semibold text-white px-5 py-2 rounded-full hover:bg-black hover:text-white cursor-pointer transition-colors duration-300"
                      onClick={() => {
                        if (!user) {
                          openAuthModal(true);
                          return;
                        }
                        setShowReplyForm(true);
                      }}
                    >
                      Add Comment
                    </button>
                  </div>
                  {showReplyForm && (
                    <div className="bg-white pt-1 pb-5 pr-8 rounded-lg mb-8">
                      <CommentReplyInput
                        user={user}
                        authorName={user.name}
                        content=""
                        replyText={replyText}
                        setReplyText={setReplyText}
                        handleAddReply={handleAddReply}
                        handleCancelReply={handleCancelReply}
                        disableAutoGen
                        type="new"
                      />
                    </div>
                  )}
                  {comments?.length > 0 &&
                    comments.map((comment) => (
                      <UserCommentInfoCard
                        key={comment._id}
                        commentId={comment._id || null}
                        authorName={comment.author.name}
                        authorProfilePicture={comment.author.profileImageUrl}
                        content={comment.content}
                        updatedAt={
                          comment.updatedAt
                            ? moment(comment.updatedAt).format("Do MMM YYYY")
                            : "-"
                        }
                        post={comment.post}
                        replies={comment.replies || []}
                        getAllComments={() =>
                          fetchCommentsByPostId(blogPostData._id)
                        }
                        onDelete={(commentId) =>
                          setOpenDeleteAlert({
                            open: true,
                            data: commentId || comment._id,
                          })
                        }
                      />
                    ))}
                </div>
              </div>
              <LikeCommentButton
                postId={blogPostData._id || ""}
                likes={blogPostData.likes || 0}
                comments={comments?.length || 0}
              />
            </div>
            <div className="col-span-12 md:col-span-4">
              <TrendingPosts />
            </div>
          </div>
          <Drawer
            isOpen={openSummarizeDrawer}
            onClose={() => setOpenSummarizeDrawer(false)}
            title={!isLoading && summaryContent?.title}
          >
            {isLoading && <SkeltonLoader />}
            {!isLoading && summaryContent && (
              <MarkdownContent content={summaryContent?.summary || ""} />
            )}
          </Drawer>
        </>
      )}
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
    </BlogLayout>
  );
};

export default BlogPostView;
