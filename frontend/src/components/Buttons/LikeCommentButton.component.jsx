import { PiHandsClapping } from "react-icons/pi";
import clsx from "clsx";
import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance.util";
import { API_PATHS } from "../../utils/apiPaths.util";
import { LuMessageCircleDashed } from "react-icons/lu";

const LikeCommentButton = ({ postId, likes, comments }) => {
  const [postLikes, setPostLikes] = useState(likes || 0);
  const [liked, setLiked] = useState(false);

  const handleLikePost = async () => {
    if (!postId) return;

    try {
      const response = await axiosInstance.post(API_PATHS.POST.LIKE(postId));

      if (response.data) {
        setPostLikes((prevState) => prevState + 1);
        setLiked(true);

        setTimeout(() => {
          setLiked(false);
        }, 500);
      }
    } catch (error) {
      console.error("Error liking post: ", error);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="fixed bottom-8 right-8 px-6 py-3 bg-black text-white rounded-full shadow-lg flex items-center justify-center">
        <button
          type="button"
          className="flex items-end"
          onClick={handleLikePost}
        >
          <PiHandsClapping
            className={clsx(
              "text-[22px] transition-transform duration-300 cursor-pointer",
              liked && "scale-125 text-cyan-500"
            )}
          />
          <span className="text-base font-medium leading-4">{postLikes}</span>
        </button>
        <div className="h-6 w-px bg-gray-500 mx-5" />
        <button type="button" className="flex items-end gap-2">
          <LuMessageCircleDashed className="text-[22px]" />
          <span className="text-base font-medium leading-4">{comments}</span>
        </button>
      </div>
    </div>
  );
};

export default LikeCommentButton;
