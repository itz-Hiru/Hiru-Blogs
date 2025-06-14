import { HiOutlineEmojiHappy } from "react-icons/hi";
import { TESTIMONIALS } from "../../utils/data.util";
import StarRating from "../../components/Rating/StarRating.component";

const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className="min-h-[100vh] justify-center items-center flex flex-col pt-24"
    >
      <div className="inline-flex items-center justify-center gap-2 bg-gray-50 border border-cyan-900 rounded-full px-4 py-1 mb-2">
        <span className="text-xs text-slate-600">Testimonials</span>
        <HiOutlineEmojiHappy className="text-xs text-slate-700" />
      </div>
      <h2 className="text-4xl font-bold text-shadow-xs text-shadow-black/24 mb-1">
        Our trusted clients
      </h2>
      <p className="max-w-md text-center text-slate-700 font-medium text-sm">
        Our mission is to share valuable insights and inspire readers through
        engaging, high-quality content.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-15 items-center justify-center mt-20">
        {TESTIMONIALS.map((testimonial, index) => (
          <div key={index} className="group">
            <div className="text-sm border border-sky-200/50 pb-6 rounded-lg bg-slate-100/50 shadow-xl backdrop-blur-2xl transform transition duration-300 group-hover:rotate-5">
              <div className="flex flex-col items-center px-5 py-4 relative">
                <img
                  src={testimonial.image}
                  alt="testimonial-image"
                  className="h-24 w-24 absolute -top-14 rounded-full"
                />
                <div className="pt-8 text-center">
                  <h1 className="text-[16px] font-semibold text-black text-shadow-xs text-shadow-black/30">
                    {testimonial.name}
                  </h1>
                  <p className="text-slate-800">{testimonial.email}</p>
                </div>
              </div>
              <p className="text-slate-600 px-6 text-center">
                {testimonial.description}
              </p>
              <div className="flex justify-center pt-4">
                <StarRating count={5} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
