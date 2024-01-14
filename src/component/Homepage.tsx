import React from "react";
import pic1 from "../pic/1.png";
import pic2 from "../pic/2.png";
import pic3 from "../pic/3.png";
import pic4 from "../pic/4.png";
import banner from "../pic/banner.png";

interface FeatureCardProps {
  image: string;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  image,
  title,
  description,
}) => (
  <div className="w-[380px] h-[438px] left-[150px] relative bg-white rounded-lg shadow">
    <img className="w-[380px] h-[272px] absolute" src={image} alt="Pic" />
    <div className="absolute left-[43px] top-[280px] h-[81px] pb-1 flex-col justify-start items-center gap-2 inline-flex">
      <div className="text-lg font-bold text-center text-slate-800 font-['Poppins']">
        {title}
      </div>
      <div className="w-[293px] text-sm font-normal text-center text-slate-800 font-['Poppins']">
        {description}
      </div>
    </div>
    <div className="absolute left-[119.50px] top-[372px] h-12 p-4 bg-cyan-900 rounded-[33px] shadow flex justify-center items-center gap-[30px] inline-flex">
      <button className="text-white text-base font-semibold font-['Poppins']">
        Buy Package
      </button>
    </div>
  </div>
);

const HomePage: React.FC = () => {

  return (
    <div className="App">
      <div className="relative">
        <img src={banner} alt="banner" />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-center text-white text-6xl font-bold">
            Lorem ipsum dolor sit amet consectetur.
          </div>
          <div className="text-center text-white text-5xl font-medium">
            One-stop Platform community for Agents and Operator in Thailand.
          </div>
        </div>
      </div>

      <div>
        <div className="left-[854px] absolute text-center text-slate-800 text-[32px] font-bold font-['Poppins']">
          Lorem ipsum
        </div>

        <div className="gap-5 inline-flex" style={{ marginTop: "100px" }}>
          <FeatureCard
            image={pic1}
            title="Lorem ipsum"
            description="One-stop Platform community for Agents and Operator in Thailand."
          />
          <FeatureCard
            image={pic2}
            title="Lorem ipsum"
            description="One-stop Platform community for Agents and Operator in Thailand."
          />
          <FeatureCard
            image={pic3}
            title="Lorem ipsum"
            description="One-stop Platform community for Agents and Operator in Thailand."
          />
          <FeatureCard
            image={pic4}
            title="Lorem ipsum"
            description="One-stop Platform community for Agents and Operator in Thailand."
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
