import { useNavigate } from "react-router-dom";
import CharAvatar from "../Defaults/CharAvatar.component";

const BlogPostCard = ({
  title,
  coverImageUrl,
  content,
  tags,
  updatedAt,
  authorName,
  authorProfilePicture,
  onClick,
}) => {
  const navigate = useNavigate();
  return (
    <div
      className="bg-white shadow-lg shadow-gray-200/70 rounded-xl border border-gray-200/50 overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      <img
        src={coverImageUrl}
        alt="post cover image"
        className="w-full h-64 object-cover"
      />
      <div className="p-4 md:p-6">
        <h2 className="text-base md:text-lg font-semibold mb-2 line-clamp-3">
          {title}
        </h2>
        <p className="text-gray-700 text-xs mb-4 line-clamp-3">{content}</p>
        <div className="flex items-center flex-wrap gap-2 mb-4">
          {tags.slice(0, 3).map((tag, index) => (
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
        <div className="flex items-center">
          {authorProfilePicture ? (
            <img
              src={authorProfilePicture}
              alt="author profile picture"
              className="w-8 h-8 rounded-full mr-2"
            />
          ) : (
            <CharAvatar fullName={authorName} width="w-8" height="h-8" />
          )}
          <div>
            <p className="text-gray-600 text-sm font-medium">{authorName}</p>
            <p className="text-gray-500 text-xs">{updatedAt}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostCard;
