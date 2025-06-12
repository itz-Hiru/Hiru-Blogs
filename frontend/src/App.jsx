import { Toaster } from "react-hot-toast";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import BlogPostCreator from "./pages/admin/BlogPostCreator.page";
import BlogPostEditor from "./pages/admin/BlogPostEditor.page";
import BlogPosts from "./pages/admin/BlogPosts.page";
import Comments from "./pages/admin/Comments.page";
import Dashboard from "./pages/admin/Dashboard.page";
import LandingPage from "./pages/LandingPage.page";
import BlogPostView from "./pages/user/BlogPostView.page";
import PostByTags from "./pages/user/PostByTags.page";
import SearchPost from "./pages/user/SearchPost.page";
import PrivateRoute from "./routes/PrivareRoute.routes";
import UserDashboard from "./pages/user/Dashboard.page";
import UserProvider from "./context/userContext.context";

const App = () => {
  return (
    <UserProvider>
      <div>
        <Router>
          <Routes>
            {/* Default Route */}
            <Route path="/" element={<LandingPage />} />

            {/* User Routes */}
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/:slug" element={<BlogPostView />} />
            <Route path="/tags/:tagName" element={<PostByTags />} />
            <Route path="/search" element={<SearchPost />} />

            {/* Admin Routes */}
            <Route element={<PrivateRoute allowedRoles={["Admin"]} />}>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/posts" element={<BlogPosts />} />
              <Route
                path="/admin/posts/edit/:postSlug"
                element={<BlogPostEditor />}
              />
              <Route path="/admin/posts/create" element={<BlogPostCreator />} />
              <Route path="/admin/comments" element={<Comments />} />
            </Route>
          </Routes>
        </Router>
        <Toaster
          toastOptions={{
            className: "",
            style: {
              fontSize: "13px",
            },
          }}
        />
      </div>
    </UserProvider>
  );
};

export default App;
