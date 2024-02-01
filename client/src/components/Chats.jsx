import { useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../config/Firebase.config";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Chats = () => {
  const [chats, setChats] = useState([]);
  const { currentuser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  //gets the current user id and compares it with the id in the userchats and the document in the userchat
  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentuser.uid), (doc) => {
        setChats(doc.data());
      });
      return () => {
        unsub();
      };
    };

    currentuser.uid && getChats();
  }, [currentuser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };
  return (
    <div className="">
      {Object.entries(chats)?.sort((a,b) => b[1].date - a[1].date).map((chat) => (
        <div
          className="p-2 flex gap-4 items-center hover:bg-[rgb(31,41,55)]"
          key={chat[0]}
          onClick={() => handleSelect(chat[1].userInfo)}
        >
          <img
            src={chat[1].userInfo.photoUrl}
            alt=""
            className="w-[60px] h-[60px] rounded-[50%]"
          />
          <div className="flex flex-col">
            <h1 className="text-xl text-white">
              {chat[1].userInfo.displayName}
            </h1>
            <p className="text-white">{chat[1].lastMessage?.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;
