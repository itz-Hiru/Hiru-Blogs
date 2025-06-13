import { FaCheckCircle } from "react-icons/fa";
import ABOUT_IMAGE from "../../assets/about_image.jpg";
import RatingCard from "../../components/Cards/RatingCard.component";

const About = () => {
  return (
    <section
      id="about"
      className="md:min-h-[100vh] flex flex-col-reverse md:flex-row items-center justify-between pb-10 pt-12 px-5 md:px-0"
    >
      <div className="flex w-full md:w-1/2 flex-col items-center md:items-start mt-6 md:mt-0">
        <h3 className="text-primary font-medium text-xl mb-5 text-center md:text-start">
          Why readers choose us
        </h3>
        <h1 className="text-black font-semibold text-[30px] md:text-[40px] leading-tight mb-7 md:mb-16 text-center md:text-start">
          Discover insights, stay informed, and grow with our blog
        </h1>
        <p className="text-slate-800 text-[14px] md:text-[16px] text-center md:text-start font-normal max-w-116 mb-5 md:mb-10">
          Our content is crafted with care, backed by real stories, expert
          opinions, and community feedback from readers like you.
        </p>
        <div className="flex flex-col items-start">
          <div className="flex flex-row gap-2 items-center justify-center mb-2">
            <FaCheckCircle className="text-secondary" />
            <p className="text-slate-600 text-sm">
              Curated and credible articles
            </p>
          </div>
          <div className="flex flex-row gap-2 items-center justify-center">
            <FaCheckCircle className="text-secondary" />
            <p className="text-slate-600 text-sm">
              Practical tips and real experiences
            </p>
          </div>
        </div>
      </div>
      <div className="relative flex w-full md:w-1/2 justify-center md:justify-end items-center">
        <img src={ABOUT_IMAGE} alt="" className="min-w-xs md:min-w-sm" />
        <div className="absolute -bottom-6 left-12 hidden sm:block">
          <RatingCard />
        </div>
      </div>
    </section>
  );
};

export default About;
