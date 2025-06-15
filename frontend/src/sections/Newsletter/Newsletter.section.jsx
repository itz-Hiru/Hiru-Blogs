import { useState } from "react";
import { LuArrowRight } from "react-icons/lu";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import { validateEmail } from "../../utils/helper.util";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const sendEmail = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      toast.error("Invalid email address");
      return;
    }

    const token = import.meta.env.VITE_ADMIN_INVITE_TOKEN;

    setLoading(true);

    try {
      const result = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        { email, token },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      toast.success("Subscribed successfully!");
      setEmail("");
    } catch (error) {
      toast.error("Subscription failed. Try again.");
      console.error("EmailJS Error:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="w-full px-5 md:px-32">
      <div className="flex flex-col items-center justify-center w-full md:py-10 py-5 bg-blue-700 rounded-xl px-5">
        <h2 className="text-white text-4xl md:text-[40px] font-semibold mb-2 text-center">
          Start Your Blogging Journey
        </h2>
        <p className="max-w-md text-gray-200 text-sm text-center mb-6">
          Subscribe to get your personal admin token and start creating your own
          blog posts instantly.
        </p>
        <div className="flex flex-row items-center justify-center gap-3 mb-6">
          <input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            placeholder="Enter your email address"
            type="email"
            className="bg-white/30 px-3 py-2.5 outline-none rounded-md placeholder:text-gray-300 text-sm text-gray-100 focus-within:border focus-within:border-gray-200/50"
          />
          <button
            type="button"
            onClick={sendEmail}
            className="bg-black text-white text-sm px-4 py-2.5 flex items-center gap-2 rounded group transition-transform duration-300"
          >
            {loading ? "Subscribing..." : "Subscribe"}
            <LuArrowRight className="group-hover:translate-x-1 text-[16px]" />
          </button>
        </div>
        <p className="text-gray-300 text-xs text-center">
          By subscribing, you will receive an admin token and you agree to our{" "}
          <span className="hover:underline cursor-pointer">Privacy Policy</span>{" "}
          and constent to recieve updates.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;
