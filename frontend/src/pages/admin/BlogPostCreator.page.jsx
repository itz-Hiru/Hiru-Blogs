import MDEditor, { commands } from "@uiw/react-md-editor";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { LuLoaderCircle, LuSave, LuSend, LuSparkles } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import BlogPostIdeaCard from "../../components/Cards/BlogPostIdeaCard.component";
import GenerateBlogPostForm from "../../components/Forms/GenerateBlogPostForm.component";
import CoverImageSelector from "../../components/Inputs/CoverImageSelector.component";
import TagInput from "../../components/Inputs/TagInput.component";
import DashboardLayout from "../../components/Layouts/DashboardLayout.component";
import SkeltonLoader from "../../components/Loaders/SkeltonLoader.component";
import Modal from "../../components/Modals/Modal.component";
import { API_PATHS } from "../../utils/apiPaths.util";
import axiosInstance from "../../utils/axiosInstance.util";
import { getToastMessageByType } from "../../utils/helper.util";
import uploadImage from "../../utils/uploadImage.util";

const BlogPostCreator = () => {
  const navigate = useNavigate();
  const [postData, setPostData] = useState({
    id: "",
    title: "",
    content: "",
    coverImageUrl: "",
    coverPreview: "",
    tags: "",
    isDraft: "",
    generatedByAI: false,
  });

  const [ideaLoading, setIdeaLoading] = useState(false);
  const [postIdeas, setPostIdeas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [openBlogPostGenForm, setOpenBlogPostGenForm] = useState({
    open: false,
    data: null,
  });

  const handleValueChange = (key, value) => {
    setPostData((prevData) => ({ ...prevData, [key]: value }));
  };

  const generatePostIdeas = async () => {
    setIdeaLoading(true);

    try {
      const aiResponse = await axiosInstance.post(
        API_PATHS.AI.GENERATE_BLOG_POST_IDEAS,
        {
          topics: "ReactJS, NextJS, NodeJS, React UI Components",
        }
      );

      const generatedIdeas = aiResponse.data;

      if (generatedIdeas?.length > 0) {
        setPostIdeas(generatedIdeas);
      }
    } catch (error) {
      console.error("Error while generating post ideas", error);
    } finally {
      setIdeaLoading(false);
    }
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

    if (!postData.coverImageUrl) {
      toast.error("Please select a cover image");
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

      const response = await axiosInstance.post(
        API_PATHS.POST.CREATE,
        reqPayload
      );

      if (response.data) {
        toast.success(getToastMessageByType(isDraft ? "draft" : "publish"));

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

  useEffect(() => {
    generatePostIdeas();

    return () => {};
  }, []);
  return (
    <DashboardLayout activeMenu="Blog Posts">
      <div className="my-5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 my-4">
          <div className="form-card p-6 col-span-12 md:col-span-8">
            <div className="flex items-center justify-between">
              <h2 className="text-base md:text-lg font-medium">Add New Post</h2>
              <div className="flex items-center gap-3">
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
          <div className="form-card col-span-12 md:col-span-4 p-0">
            <div className="flex items-center justify-between px-6 pt-6">
              <h4 className="text-sm md:text-base font-medium inline-flex items-center gap-2">
                <span className="text-sky-600">
                  <LuSparkles />
                </span>
                Ideas for your next post
              </h4>
              <button
                type="button"
                className="bg-linear-to-r from-sky-500 to-cyan-400 text-[13px] font-semibold text-white px-3 py-1 rounded hover:bg-black hover:text-white transition-colors duration-300 cursor-pointer hover:shadow-2xl hover:shadow-sky-200"
                onClick={() =>
                  setOpenBlogPostGenForm({ open: true, data: null })
                }
              >
                Generate new
              </button>
            </div>
            <div>
              {ideaLoading ? (
                <div className="p-5">
                  <SkeltonLoader />
                </div>
              ) : (
                <div className="mt-2">
                  {postIdeas.map((idea, index) => (
                    <BlogPostIdeaCard
                      key={`idea_${index}`}
                      title={idea.title || ""}
                      description={idea.description || ""}
                      tags={idea.tags || []}
                      tone={idea.tone || ""}
                      onSelect={() =>
                        setOpenBlogPostGenForm({ open: true, data: idea })
                      }
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={openBlogPostGenForm?.open}
        onClose={() => {
          setOpenBlogPostGenForm({ open: false, data: null });
        }}
        hideHeader
      >
        <GenerateBlogPostForm
          contentParams={openBlogPostGenForm?.data || null}
          setPostContent={(title, content) => {
            const postInfo = openBlogPostGenForm?.data || null;
            setPostData((prevState) => ({
              ...prevState,
              title: title || prevState.title,
              content: content,
              tags: postInfo?.tags || prevState.tags,
              generatedByAI: true,
            }));
          }}
          handleCloseForm={() => {
            setOpenBlogPostGenForm({ open: false, data: null });
          }}
        />
      </Modal>
    </DashboardLayout>
  );
};

export default BlogPostCreator;
