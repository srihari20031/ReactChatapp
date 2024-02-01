import Attachment from "../assets/images/Attachment.png";
import AddPhoto from "../assets/images/AddPhoto.png";
import Send from "../assets/images/Send.png";
import { useContext, useState } from "react";
import {
  Timestamp,
  addDoc,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/Firebase.config";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { v4 as uuid } from "uuid";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const storage = new getStorage();

const Input = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  const { currentuser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const sendMessage = async () => {
    //send message logic here
    if (text === "" && image === null) return alert("Messgae can't be Empty");
    if (image) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, image).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          await updateDoc(doc(db, "chats", data.chatId), {
            messages: arrayUnion({
              id: uuid(),
              text,
              senderId: currentuser.uid,
              date: Timestamp.now(),
              image: downloadURL,
            }),
          });
        });
      });
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentuser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    // for current user
    await updateDoc(
      doc(db, "userChats", currentuser.uid),
      {
        [data.chatId + ".lastMessage"]: { text },
        [data.chatId + ".date"]: serverTimestamp(),
      },
      setText(""),
      setImage(null)
    );

    // for the other user who is receiving the message
    await updateDoc(
      doc(db, "userChats", data.user.uid),
      {
        [data.chatId + ".lastMessage"]: { text },
        [data.chatId + ".date"]: serverTimestamp(),
      },
      setText(""),
      setImage(null)
    );
    setText("");
    setImage(null);
  };
  return (
    <div className="bg-white flex justify-between items-center p-2">
      <div className="w-[100%]">
        <input
          type="text"
          name="messagebox"
          placeholder="Type something"
          className="outline-none w-[100%] placeholder:text-[lightgray]"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="flex gap-5 items-center justify-center">
        <img src={Attachment} alt="" className=" w-[35px] h-[35px]" />
        <input
          type="file"
          id="file"
          className="border-none hidden"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <label htmlFor="file" className="flex justify-center items-center">
          <img src={AddPhoto} alt="" className=" w-[48px] h-[42px]" />
        </label>
        <button onClick={sendMessage}>
          <img src={Send} alt="" className=" w-[43px] h-[43px]" />
        </button>
      </div>
    </div>
  );
};

export default Input;
