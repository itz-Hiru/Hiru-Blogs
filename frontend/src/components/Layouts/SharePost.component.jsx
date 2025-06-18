import { useState } from "react";
import { LuCheck, LuCopy } from "react-icons/lu";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";

const SharePost = ({ title }) => {
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch((error) => console.error("Failed to copy url: ", error));
  };
  return (
    <div className="my-6">
      <p className="text-gray-600 font-medium mb-3">Share Post</p>
      <div className="flex items-center gap-4">
        <FacebookShareButton url={shareUrl} quote={title}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <TwitterShareButton url={shareUrl} title={title}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        <LinkedinShareButton url={shareUrl} title={title}>
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
        <WhatsappShareButton url={shareUrl} title={title}>
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
        <button
          type="button"
          className="bg-white hover:bg-sky-50 text-sky-800 font-medium px-2 py-2 rounded-full transition-colors duration-300 cursor-pointer"
          onClick={handleCopyClick}
        >
          {isCopied ? (
            <LuCheck className="text-[20px]" />
          ) : (
            <LuCopy className="text-[20px]" />
          )}
        </button>
      </div>
    </div>
  );
};

export default SharePost;
