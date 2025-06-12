export const BASE_URL = "http://localhost:500"; // Base Server URL

export const API_PATHS = {
  AUTH: {
    REGISTER: "/api/auth/register", // Signup User
    LOGIN: "/api/auth/login", // Login User
    GET_PROFILE: "/api/auth/profile", // Get user profile
  },

  IMAGE: {
    UPLOAD_IMAGE: "/api/auth/upload/image", // Upload image
  },

  DASHBOARD: {
    GET_DASHBOARD_DATA: "/api/dashboard/summary", // Get admin dashboard data
  },

  AI: {
    GENERATE_BLOG_POST: "/api/ai/generate/post", // Generate post from AI
    GENERATE_BLOG_POST_IDEAS: "/api/ai/generate/ideas", // Generate post ideas from AI
    GENERATE_COMMENT_REPLY: "/api/ai/generate/reply", // Generate replies for comments from AI
    GENERATE_POST_SUMMARY: "/api/ai/generate/summary", // Generate posts summary from AI
  },

  POST: {
    CREATE: "/api/posts/create", // Create post (admins only)
    GET_ALL: "/api/posts/", // Get all posts
    GET_POST_BY_SLUG: (slug) => `/api/posts/slug/${slug}`, // Get posts by slug
    GET_POST_BY_TAG: (tag) => `/api/posts/tag/${tag}`, // Get posts by tag
    GET_TRENDING_POSTS: "/api/posts/trending", // Get trending posts
    SEARCH_POST: "/api/posts/search", // Search posts
    UPDATE_POST: (id) => `/api/posts/${id}/update`, // Update post(admins only)
    DELETE_POST: (id) => `/api/posts/${id}/delete`, // Delete post(admins only)
    INCREMENT_VIEW: (id) => `/api/posts/${id}/view`, // Increment view count
    LIKE: (id) => `/api/posts/${id}/like`, // Add a like to blog post
  },

  COMMENTS: {
    ADD_COMMENT: (postId) => `/api/comments/${postId}/add`, // Add a comment
    GET_ALL: "/api/comments/", // Get all comments
    GET_ALL_BY_POST: (postId) => `/api/comments/${postId}`, // Get all comments for a selected post
    DELETE: (commentId) => `api/comments/${commentId}/delete`, // Delete a comment
  },
};
