/* eslint-disable react/prop-types */
import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = ({ message }) => {
  const { currentuser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  // learn about useRef hook

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`flex ${
        message.senderId === currentuser.uid && "flex-row-reverse"
      }  gap-3 p-2`}
    >
      <div className="flex flex-col">
        <img
          src={
            message.senderId === currentuser.uid
              ? currentuser.photoURL
              : data.user.photoURL
          }
          alt=""
          className="w-[50px] h-[50px] rounded-[50%]"
        />
        <span className="text-[gray] mt-2 mr-2">just now</span>
      </div>
      <div className="max-w-[80%] flex  flex-col gap-2 items-end">
        <h1 className="text-lg bg-indigo-400 py-3 px-5  rounded-br-lg rounded-l-lg max-w-max">
          {message.text}
        </h1>
        {message.image && (
          <img
            src={message.image}
            alt=""
            className="w-[250px] h-[400px] rounded-xl"
          />
        )}
      </div>
    </div>
  );
};

// Message.PropTypes = {
//   image:  PropTypes.string,
// }

export default Message;
