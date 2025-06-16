import moment from "moment";
import DashboardLayout from "../../components/Layouts/DashboardLayout.component";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { LuGalleryVerticalEnd, LuLoaderCircle, LuPlus } from "react-icons/lu";
import Tabs from "../../components/Tabs/Tabs.component";
import axiosInstance from "../../utils/axiosInstance.util";
import { API_PATHS } from "../../utils/apiPaths.util";
import BlogPostSummaryCard from "../../components/Cards/BlogPostSummaryCard.component";
import Modal from "../../components/Modals/Modal.component";
import DeleteAlert from "../../components/Alerts/DeleteAlert.component";
import toast from "react-hot-toast";

const BlogPosts = () => {
  const navigate = useNavigate();

  const [tabs, setTabs] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [blogPostList, setBlogPostList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null,
  });

  // Fetch all blog posts
  const getAllPosts = async (pageNumber = 1) => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(API_PATHS.POST.GET_ALL, {
        params: {
          status: filterStatus.toLowerCase(),
          page: pageNumber,
        },
      });

      const { posts, totalPages, counts } = response.data;

      setBlogPostList((prevPosts) =>
        pageNumber === 1 ? posts : [...prevPosts, ...posts]
      );
      setTotalPages(totalPages);
      setPage(pageNumber);

      // Map status summary data with fixed labels and order
      const statusSummary = counts || {};
      const statusArray = [
        { label: "All", count: statusSummary.all || 0 },
        { label: "Published", count: statusSummary.published || 0 },
        { label: "Draft", count: statusSummary.draft || 0 },
      ];

      setTabs(statusArray);
    } catch (error) {
      console.error("Error while fetching blog posts: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete blog post
  const deletePost = async (postId) => {
    try {
      await axiosInstance.delete(API_PATHS.POST.DELETE_POST(postId));
      setOpenDeleteAlert({
        open: false,
        data: null,
      });
      toast.success("Post deleted successfully.");
      getAllPosts();
    } catch (error) {
      toast.error("Failed to delete post");
      console.error("Error while deleting post: ", error);
    }
  };

  // Load more posts
  const handleLoadMore = () => {
    if (page < totalPages) {
      getAllPosts(page + 1);
    }
  };

  useEffect(() => {
    getAllPosts(1);
    return () => {};
  }, [filterStatus]);
  return (
    <DashboardLayout activeMenu="Blog Posts">
      <div className="w-auto sm:max-w-[980px] mx-auto">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold mt-5 mb-5">Blog Posts</h2>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => navigate("/admin/posts/create")}
          >
            <LuPlus className="text-[18px]" />
            Create Post
          </button>
        </div>
        <Tabs
          tabs={tabs}
          activeTab={filterStatus}
          setActiveTab={setFilterStatus}
        />
        <div className="mt-5">
          {blogPostList.map((post) => (
            <BlogPostSummaryCard
              key={post._id}
              title={post.title}
              imageUrl={post.coverImageUrl}
              updatedOn={
                post.updatedAt
                  ? moment(post.updatedAt).format("Do MMM YYYY")
                  : "-"
              }
              tags={post.tags}
              likes={post.likes}
              views={post.views}
              onClick={() => navigate(`/admin/posts/edit/${post.slug}`)}
              onDelete={() =>
                setOpenDeleteAlert({ open: true, data: post._id })
              }
            />
          ))}
          {page < totalPages && (
            <div className="flex items-center justify-center mb-8">
              <button
                type="button"
                className="flex items-center gap-3 text-sm text-white font-medium bg-black px-7 py-2.5 rounded-full text-nowrap hover:scale-105 transition-all cursor-pointer"
                disabled={isLoading}
                onClick={handleLoadMore}
              >
                {isLoading ? (
                  <LuLoaderCircle className="animate-spin text-[15px]" />
                ) : (
                  <LuGalleryVerticalEnd className="text-lg" />
                )}{" "}
                {isLoading ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </div>
      </div>
      <Modal
        isOpen={openDeleteAlert?.open}
        onClose={() => {
          setOpenDeleteAlert({ open: false, data: null });
        }}
        title="Delete Alert"
      >
        <div className="w-[70vw] md:w-[30vw]">
          <DeleteAlert
            content="Are you sure want to delete this post?"
            onDelete={() => deletePost(openDeleteAlert.data)}
          />
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default BlogPosts;
