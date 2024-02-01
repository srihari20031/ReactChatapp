import VideoCall from "../assets/images/Videocall.png";
import AddFriend from "../assets/images/AddFriend.png";
import Options from "../assets/images/Options.png";
import Input from "./Input";
import Messages from "./Messages";
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="flex-[2] flex justify-between flex-col shadow-[rgba(255,255,255,0.1)_0px_1px_1px_0px_inset,rgba(50,50,93,0.25)_0px_50px_100px_-20px,rgba(0,0,0,0.3)_0px_30px_60px_-30px]">
      <div className="flex items-center justify-between h-[75px] bg-[rgb(60,61,61)] p-4">
        <div>
        {/* Here we use only the display name from the userinfo got from the chatcontext user */}
          <h1 className="text-xl text-white">{data.user.displayName}</h1>
        </div>
        <div className="flex gap-2">
          <img src={VideoCall} alt="" className=" w-[48px] h-[48px]" />
          <img src={AddFriend} alt="" className=" w-[48px] h-[48px]" />
          <img src={Options} alt="" className=" w-[48px] h-[48px]" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
