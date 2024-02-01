import Ninchat from "../assets/images/Reactchatlogo.png";
import Profile from "../assets/images/Profile.jpg";
import Chats from "./Chats";
import { signOut } from "firebase/auth";
import { auth } from "../config/Firebase.config";
import Search from "./Search";

const Sidebar = () => {
  return (
    <div className="flex-1 relative shadow-[rgba(255,255,255,0.1)_0px_1px_1px_0px_inset,rgba(50,50,93,0.25)_0px_50px_100px_-20px,rgba(0,0,0,0.3)_0px_30px_60px_-30px]  bg-[#314158] ">
      <div className="flex p-4 justify-between items-center  bg-[rgb(31,41,55)]  h-[75px]">
        <div className="flex">
          <div className="flex text-white items-center cursor-pointer gap-2">
            <img src={Ninchat} alt="" className="w-8 h-8" />
            <p className="font-bold text-xl">Ninchat</p>
          </div>
        </div>
        <div>
          <div className="flex gap-4">
            <img
              src={Profile}
              alt=""
              className="w-[45px] h-[45px] rounded-[50%]"
            />
            <button
              className="bg-[#EBE8E1] p-2 rounded-lg"
              onClick={() => signOut(auth)}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <div className="p-4 w-[350px] text-white">
        <Search />
      </div>
      <div className="flex flex-col gap-2 p-2">
        <Chats />
      </div>
    </div>
  );
};

export default Sidebar;
