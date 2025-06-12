import DESKTOP_HERO_IMAGE from "../../assets/desktop_hero_image.png";
import MOBILE_HERO_IMAGE from "../../assets/mobile_hero_image.png";

const Hero = ({ onClick }) => {
  return (
    <section
      className="md:min-h-[90vh] mt-20 md:mt-24 flex flex-col-reverse md:flex-row items-center justify-between pb-10"
      id="hero"
    >
      <div className="flex flex-col items-center md:items-start mt-2 md:mt-0">
        <div className="hidden md:flex items-center mb-2 w-full">
          <span className="text-[13px] text-black/60 font-semibold mr-2">
            Welcome
          </span>
          <div className="flex-1 h-[1px] bg-slate-300"></div>
        </div>
        <h1 className="text-4xl md:text-6xl font-semibold leading-tight text-black">
          Share Your{" "}
          <span className="text-transparent bg-clip-text bg-[radial-gradient(circle,_#4E70F0_0%,_#5BD4F1_100%)] bg-[length:200%_200%] animate-text-shine font-bold">
            Voice
          </span>
          <br /> Inspire the World
        </h1>
        <p className="mt-8 text-slate-600 text-sm sm:text-base max-w-lg text-center md:text-start">
          Start your journey as a writer, explore new perspectives, and connect
          with readers everywhere.
        </p>
        <div className="flex items-center mt-6 gap-6">
          <button
            type="button"
            onClick={onClick}
            className="bg-primary text-white px-6 py-2.5 rounded-md font-medium transition-colors duration-500 border border-primary focus:bg-transparent focus:text-primary hover:bg-transparent hover:text-primary"
          >
            Read Now
          </button>
          <a
            href="#about"
            className="bg-transparent text-primary border border-primary px-6 py-2.5 rounded-md transition-colors duration-500 font-medium focus:text-white focus:bg-primary hover:text-white hover:bg-primary cursor-default"
          >
            View More
          </a>
        </div>
      </div>
      <img
        className="hidden md:block md:max-w-[465px]"
        src={DESKTOP_HERO_IMAGE}
        alt="desktop_hero_image"
      />
      <img
        className="block md:hidden w-full"
        src={MOBILE_HERO_IMAGE}
        alt="mobile_hero_image"
      />
    </section>
  );
};

export default Hero;
