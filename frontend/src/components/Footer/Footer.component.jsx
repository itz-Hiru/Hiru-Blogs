import Newsletter from "../../sections/Newsletter/Newsletter.section";

const Footer = () => {
  return (
    <footer className="px-5 md:px-16 lg:px-24 xl:px-32 pt-28 w-full text-gray-500 bg-white relative mt-60">
      <div className="absolute -top-48 left-1/2 transform -translate-x-1/2 w-full max-w-6xl">
        <Newsletter />
      </div>
      <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500/30 pb-6">
        <div className="md:max-w-96">
          <a href="/" className="cursor-default">
            <span className="font-header text-2xl text-primary">
              Hiru Blogs
            </span>
          </a>
          <p className="mt-6 text-sm">
            Thanks for stopping by! I share stories, tips, and ideas to inspire
            and inform. Stay connected, keep learning, and feel free to reach
            out anytime.
          </p>
        </div>

        <div className="flex-1 flex items-start justify-center md:justify-end gap-20">
          <div>
            <h2 className="font-semibold mb-5 text-gray-800">Company</h2>
            <ul className="text-sm space-y-2">
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#about">About us</a>
              </li>
              <li>
                <a href="#topcharts">Top Charts</a>
              </li>
              <li>
                <a href="#testimonials">Testimonials</a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold mb-5 text-gray-800">Get in touch</h2>
            <div className="text-sm space-y-2">
              <p>+94 72 550 8919</p>
              <p>hirumithakuladewanew@gmail.com</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between w-full gap-4 md:gap-10 pt-4 pb-5">
        <div className="justify-center md:justify-start items-start flex">
          <p className="text-xs md:text-sm">
            &copy; {new Date().getFullYear()} Hiru Blogs. All rights reserved.
          </p>
        </div>

        <div className="flex-1 flex items-start text-sm justify-center md:justify-end gap-10">
          <div className="pr-10 border-r border-gray-400">
            <a
              href="https://github.com/itz-Hiru"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
          <div className="pr-10 border-r border-gray-400">
            <a
              href="https://linkedin.com/in/hirumitha"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>
          <div>
            <a
              href="https://instagram.com/x_hiru23"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
