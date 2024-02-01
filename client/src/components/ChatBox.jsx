import Chat from "./Chat";
import Sidebar from "./Sidebar";

const ChatBox = () => {
  return (
    <div className=" h-[100vh] flex  items-center justify-center ">
      <div className="flex h-[80%] w-[65%] shadow-[rgba(0,0,0,0.56)_0px_22px_70px_4px] rounded-lg overflow-hidden ">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
};

export default ChatBox;
