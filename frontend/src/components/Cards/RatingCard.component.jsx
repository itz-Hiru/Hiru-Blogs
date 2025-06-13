import { FaFileAlt } from "react-icons/fa";
import { FaMedal } from "react-icons/fa6";
import { SiBookstack } from "react-icons/si";

const RatingCard = () => {
  return (
    <div className="w-[300px] h-[250px] flex flex-wrap bg-white rounded-xl shadow-2xl shadow-black/40 border border-gray-200/50 z-40">
      <div className="flex relative">
        <div className="bg-primary rounded-full w-12 h-12 flex items-center justify-center absolute -top-6 left-54">
          <FaMedal className="text-[25px] text-white" />
        </div>
      </div>
      <div className="p-4 flex flex-col items-start mt-8">
        <h4 className="text-black font-bold text-shadow-sm text-shadow-black/20 mb-1">
          Top Rated Blog
        </h4>
        <p className="text-black text-[12px] text-shadow-xs font-medium text-shadow-black/20">
          #1 Curios Minds
        </p>
        <div className="flex flex-row justify-between items-center mt-8 gap-6">
          <div className="flex flex-row gap-1.5 items-center justify-center">
            <FaFileAlt className="text-primary text-[32px] " />
            <div className="flex flex-col items-start">
              <h4 className="text-black text-[14px] font-semibold">
                Tech Trends
              </h4>
              <p className="text-gray-600 text-[11px] font-medium">
                Monday - Updated Weekly
              </p>
            </div>
          </div>
          <span className="font-bold text-black text-[12px]">40+ Readers</span>
        </div>
        <div className="flex flex-row justify-between items-center mt-4 w-full gap-2">
          <div className="flex flex-row gap-1.5 items-center">
            <SiBookstack className="text-primary text-[32px]" />
            <div className="flex flex-col">
              <h4 className="text-black text-[14px] font-semibold">
                Personal Growth
              </h4>
              <p className="text-gray-600 text-[11px] font-medium">
                Thursday – New every week
              </p>
            </div>
          </div>
          <span className="font-bold text-black text-[12px]">96+ Engaged</span>
        </div>
      </div>
    </div>
  );
};

export default RatingCard;
