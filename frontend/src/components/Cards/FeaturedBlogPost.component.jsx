import CharAvatar from "../Defaults/CharAvatar.component";

const FeaturedBlogPost = ({
  title,
  coverImageUrl,
  content,
  tags,
  updatedAt,
  authorName,
  authorProfilePicture,
  onClick,
}) => {
  return (
    <div
      className="grid grid-cols-12 bg-white shadow-lg shadow-gray-200/70 border border-gray-200/50 rounded-xl overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      <div className="col-span-6">
        <img
          src={coverImageUrl}
          alt="post cover image"
          className="w-full h-80 object-cover"
        />
      </div>
      <div className="col-span-6">
        <div className="p-6">
          <h2 className="text-lg md:text-2xl font-bold mb-2 line-clamp-3">
            {title}
          </h2>
          <p className="text-gray-700 text-[13px] mb-4 line-clamp-3">
            {content}
          </p>
          <div className="flex items-center flex-wrap gap-2 mb-4">
            {tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="bg-sky-200/50 text-sky-800/80 text-xs font-medium px-3 py-0.5 rounded-full text-nowrap"
              >
                # {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center">
            {authorProfilePicture ? (
              <img
                src={authorProfilePicture}
                alt="profile image"
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
    </div>
  );
};

export default FeaturedBlogPost;
