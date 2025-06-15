import BlogNavbar from "../Navbar/BlogNavbar.component"

const BlogLayout = ({ children }) => {
  return (
    <div className="bg-white pb-30">
        <BlogNavbar />
        <div className="container px-5 md:px-16 lg:px-24 xl:px-32 mt-10">{children}</div>
    </div>
  )
}

export default BlogLayout