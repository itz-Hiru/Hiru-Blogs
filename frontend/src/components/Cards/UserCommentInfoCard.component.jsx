import { useContext, useState } from "react";
import { UserContext } from "../../context/userContext.context";
import axiosInstance from "../../utils/axiosInstance.util";
import { API_PATHS } from "../../utils/apiPaths.util";
import toast from "react-hot-toast";
import CharAvatar from "../Defaults/CharAvatar.component";
import { LuChevronDown, LuDot, LuReply } from "react-icons/lu";
import Modal from "../Modals/Modal.component";
import Login from "../../pages/authentication/Login.page";
import SignUp from "../../pages/authentication/SignUp.page";
import CommentReplyInput from "../Inputs/CommentReplyInput.component";
import moment from "moment";

const UserCommentInfoCard = ({
  commentId,
  authorName,
  authorProfilePicture,
  content,
  updatedAt,
  post,
  replies,
  getAllComments,
  isSubReply,
  onDelete,
}) => {
  const { user } = useContext(UserContext);
  const [replyText, setReplyText] = useState("");
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showSubReplies, setShowSubReplies] = useState(false);
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleCancelReply = () => {
    setReplyText("");
    setShowReplyForm(false);
  };

  const handleAddReply = async () => {
    try {
      await axiosInstance.post(API_PATHS.COMMENTS.ADD_COMMENT(post._id), {
        content: replyText,
        parentComment: commentId,
      });
      toast.success("Reply sent.");
      setReplyText("");
      setShowReplyForm(false);
      getAllComments();
    } catch (error) {
      toast.error("Error while sending reply");
      console.error("Error while replying: ", error);
    }
  };
  return (
    <div className="bg-white p-3 rounded-lg cursor-pointer group mb-5">
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-12 md:col-span-8 order-2 md:order-1">
          <div className="flex items-start gap-3">
            {authorProfilePicture ? (
              <img
                src={authorProfilePicture}
                alt="profile picture"
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <CharAvatar fullName={authorName} width="w-10" height="h-10" />
            )}
            <div className="flex-1">
              <div className="flex items-center gap-1">
                <h3 className="text-[12px] text-gray-500 font-medium">
                  @{authorName}
                </h3>
                <LuDot className="text-gray-500" />
                <span className="text-[12px] text-gray-500 font-medium">
                  {updatedAt}
                </span>
              </div>
              <p className="text-sm text-black font-medium">{content}</p>
              <div className="flex items-center gap-3 mt-1.5">
                {!isSubReply && (
                  <>
                    <button
                      type="button"
                      className="flex items-center gap-2 text-[13px] font-medium text-sky-600 bg-sky-50 px-4 py-0.5 rounded-full hover:bg-sky-500 hover:text-white transition-colors duration-300 cursor-pointer"
                      onClick={() => {
                        if (!user) {
                          openAuthModal(true);
                          return;
                        }
                        setShowReplyForm((prevState) => !prevState);
                      }}
                    >
                      <LuReply />
                      Reply
                    </button>
                    <button
                      type="button"
                      className="flex items-center gap-1.5 text-[13px] font-medium text-sky-600 bg-sky-50 px-4 py-0.5 rounded-full hover:bg-sky-500 hover:text-white transition-colors duration-300 cursor-pointer"
                      onClick={() =>
                        setShowSubReplies((prevState) => !prevState)
                      }
                    >
                      {replies?.length || 0}{" "}
                      {replies?.length == 1 ? "reply" : "replies"}{" "}
                      <LuChevronDown
                        className={`${showSubReplies ? "rotate-180" : ""}`}
                      />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {!isSubReply && showReplyForm && (
        <CommentReplyInput
          user={user}
          authorName={authorName}
          content={content}
          replyText={replyText}
          setReplyText={setReplyText}
          handleAddReply={handleAddReply}
          handleCancelReply={handleCancelReply}
          disableAutoGen
        />
      )}
      {showSubReplies &&
        replies?.length > 0 &&
        replies.map((reply, index) => (
          <div key={index} className={`ml-5 ${index === 0 ? "mt-5" : ""}`}>
            <UserCommentInfoCard
              authorName={reply.author.name}
              authorProfilePicture={reply.author.profileImageUrl}
              content={reply.content}
              post={reply.post}
              replies={reply.replies || []}
              isSubReply
              updatedAt={
                reply.updatedAt
                  ? moment(reply.updatedAt).format("Do MMM YYYY")
                  : "-"
              }
              onDelete={() => onDelete(reply._id)}
            />
          </div>
        ))}
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
    </div>
  );
};

export default UserCommentInfoCard;
