export const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

export const getInitials = (fullName) => {
  if (!fullName) return "";

  const words = fullName.split(" ");
  let initials = "";

  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initials += words[i][0];
  }

  return initials.toUpperCase();
};

export const getToastMessageByType = (type) => {
  switch (type) {
    case "edit":
      return "Blog post updated successfully";
    case "draft":
      return "Post saved as draft";
    case "publish":
      return "Blog post published successfully";
    default:
      return null;
  }
};

export const sanitizeMarkdown = (content) => {
  const markdownBlockRegex = /```(?:markdown)?\n([\s\S]*?)\n```/;
  const match = content.match(markdownBlockRegex);
  return match ? match[1] : content;
};
