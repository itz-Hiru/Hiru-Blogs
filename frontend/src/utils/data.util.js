import { LuFileStack, LuLayoutDashboard, LuLogOut } from "react-icons/lu";
import { LiaCommentSolid } from "react-icons/lia";
import TESTIMONIAL_01 from "../assets/testimonial-01.jpg";
import TESTIMONIAL_02 from "../assets/testimonial-02.jpg";
import TESTIMONIAL_03 from "../assets/testimonial-03.jpg";
import TESTIMONIAL_04 from "../assets/testimonial-04.jpg";
import TESTIMONIAL_05 from "../assets/testimonial-05.jpg";
import TESTIMONIAL_06 from "../assets/testimonial-06.jpg";

export const NAV_LINKS = [
  {
    id: "01",
    name: "Home",
    path: "#",
  },
  {
    id: "02",
    name: "About",
    path: "#about",
  },
  {
    id: "03",
    name: "Top Charts",
    path: "#topcharts",
  },
  {
    id: "04",
    name: "Testimonials",
    path: "#testimonials",
  },
];

export const TESTIMONIALS = [
  {
    id: "01",
    image: TESTIMONIAL_01,
    name: "Priya M.",
    email: "priyamgopal94@gmail.com",
    description:
      "This blog consistently delivers fresh perspectives and useful advice. It’s my go-to for staying informed and inspired.",
  },
  {
    id: "02",
    image: TESTIMONIAL_02,
    name: "Alex J.",
    email: "alexj78@gmail.com",
    description:
      "Every article is a perfect mix of depth and clarity. I’ve learned so much in such a short time!",
  },
  {
    id: "03",
    image: TESTIMONIAL_03,
    name: "Emily N.",
    email: "noughtenemily2005@gmail.com",
    description:
      "I love how the content is both practical and thought-provoking. It feels like having a smart friend guide me.",
  },
  {
    id: "04",
    image: TESTIMONIAL_04,
    name: "Liam R.",
    email: "liamrolewester@gmail.com",
    description:
      "Whether it’s productivity tips or in-depth guides, this blog never disappoints. Highly recommended!",
  },
  {
    id: "05",
    image: TESTIMONIAL_05,
    name: "Sofia T.",
    email: "tsofia2000@gmail.com",
    description:
      "Clean design, easy to read, and always relevant topics — this blog has become part of my daily routine.",
  },
  {
    id: "06",
    image: TESTIMONIAL_06,
    name: "Jordan K.",
    email: "jorderkhan65@gmail.com",
    description:
      "It’s rare to find a blog that’s so informative yet still fun to read. Keep up the great work!",
  },
];

export const SIDE_MENU_DATA = [
  {
    id: "01",
    icon: LuLayoutDashboard,
    label: "Dashboard",
    path: "/admin/dashboard",
  },
  {
    id: "02",
    icon: LuFileStack,
    label: "Blog Posts",
    path: "/admin/posts",
  },
  {
    id: "03",
    icon: LiaCommentSolid,
    label: "Comments",
    path: "/admin/comments",
  },
  {
    id: "04",
    icon: LuLogOut,
    label: "Logout",
    path: "logout",
  }
]