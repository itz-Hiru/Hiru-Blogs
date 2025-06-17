import { useNavigate } from "react-router-dom";
import moment from "moment";
import DashboardLayout from "../../components/Layouts/DashboardLayout.component";
import { useEffect, useState } from "react";
import CommentInfoCard from "../../components/Cards/CommentInfoCard.component";
import axiosInstance from "../../utils/axiosInstance.util";
import { API_PATHS } from "../../utils/apiPaths.util";
import toast from "react-hot-toast";
import Modal from "../../components/Modals/Modal.component";
import DeleteAlert from "../../components/Alerts/DeleteAlert.component";

const Comments = () => {
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null,
  });

  const getAllComments = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.COMMENTS.GET_ALL);
      setComments(response.data?.length > 0 ? response.data : []);
    } catch (error) {
      console.error("Error while fetching comments: ", error);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      await axiosInstance.delete(API_PATHS.COMMENTS.DELETE(commentId));
      toast.success("Comment deleted successfully");
      setOpenDeleteAlert({ open: false, data: null });
      getAllComments();
    } catch (error) {
      toast.error("Error deleting comment");
      console.error("Error while deleting comment: ", error);
    }
  };

  useEffect(() => {
    getAllComments();
    return () => {};
  }, []);
  return (
    <DashboardLayout activeMenu="Comments">
      <div className="w-auto sm:max-w-[900px] mx-auto">
        <h2 className="text-xl font-semibold mt-5 mb-5">Comments</h2>
        {comments.map((comment) => (
          <CommentInfoCard
            key={comment._id}
            commentId={comment._id || null}
            authorName={comment.author.name}
            authorImage={comment.author.profileImageUrl}
            content={comment.content}
            updatedAt={
              comment.updatedAt
                ? moment(comment.updatedAt).format("Do MMM YYYY")
                : "-"
            }
            post={comment.post}
            replies={comment.replies || []}
            getAllComments={getAllComments}
            onDelete={(commentId) =>
              setOpenDeleteAlert({ open: true, data: commentId || comment._id })
            }
          />
        ))}
      </div>
      <Modal
        isOpen={openDeleteAlert?.open}
        onClose={() => {
          setOpenDeleteAlert({ open: false, data: null });
        }}
        title="Delete Comment"
      >
        <div className="w-[30vw]">
          <DeleteAlert
            content="Are you sure you want to delete this comment?"
            onDelete={() => deleteComment(openDeleteAlert.data)}
          />
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default Comments;
