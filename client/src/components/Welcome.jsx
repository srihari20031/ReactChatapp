import Blob2 from "../assets/images/Blob2.png";
import Blob3 from "../assets/images/Blob3.png"

const Welcome = () => {
  return (
    <div>
    <div className="flex items-center justify-center mt-60">
      <h1 className="text-3xl font-bold">Welcome To NinChat</h1>
      <img src={Blob2} alt="" className="w-80 h-70 " />
    </div>
    <div className="flex justify-between items-center">
    <img src={Blob3} alt="" />
    <img src={Blob3} alt="" />
    </div>
    </div>
  );
};

export default Welcome;
