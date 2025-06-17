import MDEditor, { commands } from "@uiw/react-md-editor";
import DashboardLayout from "../../components/Layouts/DashboardLayout.component";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { LuLoaderCircle, LuSave, LuSend, LuTrash2 } from "react-icons/lu";
import CoverImageSelector from "../../components/Inputs/CoverImageSelector.component";
import TagInput from "../../components/Inputs/TagInput.component";
import axiosInstance from "../../utils/axiosInstance.util";
import { API_PATHS } from "../../utils/apiPaths.util";
import toast from "react-hot-toast";
import uploadImage from "../../utils/uploadImage.util";
import { getToastMessageByType } from "../../utils/helper.util";
import Modal from "../../components/Modals/Modal.component";
import DeleteAlert from "../../components/Alerts/DeleteAlert.component";

const BlogPostEditor = () => {
  const navigate = useNavigate();
  const { postSlug = "" } = useParams();
  const [postData, setPostData] = useState({
    id: "",
    title: "",
    content: "",
    coverImageUrl: "",
    coverPreview: "",
    tags: [],
    isDraft: "",
    generatedByAI: false,
  });

  const [loading, setLoading] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  const handleValueChange = (key, value) => {
    setPostData((prevData) => ({ ...prevData, [key]: value }));
  };

  const handlePublish = async (isDraft) => {
    let coverImageUrl = "";

    if (!postData.title.trim()) {
      toast.error("Please enter the title");
      return;
    }

    if (!postData.content.trim()) {
      toast.error("Please enter some content");
      return;
    }

    if (!postData.coverImageUrl && !postData.coverPreview) {
      toast.error("Please select a cover image");
      return;
    }
    if (!postData.tags.length) {
      toast.error("Please add at least one tag.");
      return;
    }

    setLoading(true);
    setPublishing(!isDraft);

    try {
      if (postData.coverImageUrl instanceof File) {
        const imageUploadRes = await uploadImage(postData.coverImageUrl);
        coverImageUrl = imageUploadRes.imageUrl || "";
      } else {
        coverImageUrl = postData.coverPreview;
      }

      const reqPayload = {
        title: postData.title,
        content: postData.content,
        coverImageUrl,
        tags: postData.tags,
        isDraft: isDraft ? true : false,
        generatedByAI: true,
      };

      const response = await axiosInstance.put(
        API_PATHS.POST.UPDATE_POST(postData.id),
        reqPayload
      );

      if (response.data) {
        toast.success(getToastMessageByType(isDraft ? "draft" : "edit"));

        navigate("/admin/posts");
      }
    } catch (error) {
      toast.error("Failed to upload post.");
      console.log("Error while uploading: ", error);
    } finally {
      setLoading(false);
      setPublishing(false);
    }
  };

  const fetchPostDetailsBySlug = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.POST.GET_POST_BY_SLUG(postSlug)
      );

      if (response.data) {
        const data = response.data;
        setPostData((prevState) => ({
          ...prevState,
          id: data._id,
          title: data.title,
          content: data.content,
          coverPreview: data.coverImageUrl,
          tags: data.tags,
          isDraft: data.isDraft,
          generatedByAI: data.generatedByAI,
        }));
      }
    } catch (error) {
      console.error("Error while fetching post details: ", error);
    }
  };

  const deletePost = async () => {
    try {
      await axiosInstance.delete(API_PATHS.POST.DELETE_POST(postData.id));
      setOpenDeleteAlert(false);
      toast.success("Post deleted successfully.");
      navigate("/admin/posts");
    } catch (error) {
      toast.error("Error deleting post");
      console.error("Error while deleting post: ", error);
    }
  };

  useEffect(() => {
    fetchPostDetailsBySlug();

    return () => {};
  }, []);
  return (
    <DashboardLayout activeMenu="Blog Posts">
      <div className="my-5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 my-4">
          <div className="form-card p-6 col-span-12">
            <div className="flex items-center justify-between">
              <h2 className="text-base md:text-lg font-medium">Edit Post</h2>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="flex items-center gap-2.5 text-[13px] font-medium text-rose-500 bg-rose-50/60 rounded px-1.5 md:px-3 py-1 md:py-[3px] border border-rose-50 hover:border-rose-300 cursor-pointer hover-scale-[1.02] transition-all duration-300"
                  disabled={loading}
                  onClick={() => setOpenDeleteAlert(true)}
                >
                  <LuTrash2 className="text-sm" />{" "}
                  <span className="hidden md:block">Delete</span>
                </button>
                <button
                  type="button"
                  className="flex items-center gap-2.5 text-[13px] font-medium text-sky-500 bg-sky-50/60 rounded px-1.5 md:px-3 py-1 md:py-[3px] border border-sky-50 hover:border-sky-300 cursor-pointer hover-scale-[1.02] transition-all duration-300"
                  disabled={loading}
                  onClick={() => handlePublish(true)}
                >
                  {loading && !publishing ? (
                    <LuLoaderCircle className="animate-spin text-[15px]" />
                  ) : (
                    <LuSave className="text-sm" />
                  )}{" "}
                  {loading && !publishing ? "Saving..." : "Save as draft"}
                </button>
                <button
                  type="button"
                  className="flex items-center gap-2.5 text-[13px] font-medium text-sky-500 bg-sky-50/60 rounded px-1.5 md:px-3 py-1 md:py-[3px] border border-sky-50 hover:border-none hover:bg-linear-to-r from-violet-500 to-cyan-600 hover:text-white cursor-pointer hover-scale-[1.02] transition-all duration-300"
                  disabled={loading}
                  onClick={() => handlePublish(false)}
                >
                  {publishing ? (
                    <LuLoaderCircle className="animate-spin text-[15px]" />
                  ) : (
                    <LuSend className="text-sm" />
                  )}{" "}
                  {publishing ? "Publishing..." : "Publish"}
                </button>
              </div>
            </div>
            <div className="mt-4">
              <label className="text-xs font-medium text-slate-600">
                Post Title
              </label>
              <input
                placeholder="Enter post title"
                className="form-input"
                value={postData.title}
                onChange={({ target }) =>
                  handleValueChange("title", target.value)
                }
              />
            </div>
            <div className="mt-4">
              <CoverImageSelector
                image={postData.coverImageUrl}
                setImage={(value) => handleValueChange("coverImageUrl", value)}
                preview={postData.coverPreview}
                setPreview={(value) => handleValueChange("coverPreview", value)}
              />
            </div>
            <div className="mt-3">
              <label className="text-xs font-medium text-slate-600">
                Content
              </label>
              <div className="mt-3" data-color-mode="light">
                <MDEditor
                  value={postData.content}
                  onChange={(data) => {
                    handleValueChange("content", data);
                  }}
                  commands={[
                    commands.bold,
                    commands.italic,
                    commands.strikethrough,
                    commands.hr,
                    commands.title,
                    commands.divider,
                    commands.link,
                    commands.code,
                    commands.image,
                    commands.unorderedListCommand,
                    commands.orderedListCommand,
                    commands.checkedListCommand,
                  ]}
                  hideMenu={true}
                />
              </div>
            </div>
            <div className="mt-3">
              <label className="text-xs font-medium text-slate-600">Tags</label>
              <TagInput
                tags={postData?.tags || []}
                setTags={(data) => {
                  handleValueChange("tags", data);
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={openDeleteAlert}
        onClose={() => {
          setOpenDeleteAlert(false);
        }}
        title="Delete Alert"
      >
        <div className="w-[30vw]">
          <DeleteAlert
            content="Are you sure you want to delete this post?"
            onDelete={() => deletePost()}
          />
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default BlogPostEditor;
