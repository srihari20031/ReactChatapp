import { useContext, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../config/Firebase.config";
import { AuthContext } from "../context/AuthContext";

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState("");
  const [err, setErr] = useState("");
  const { currentuser } = useContext(AuthContext);

  const storageRef = collection(db, "users");

  const serachUser = async () => {
    // query in firebase is similar to query in db it is used to fetch the data from the database.
    // Here the username searched is compared with the displayname in the db to check whether the user exists if exists it returns the user if not it gives user not found
    
    const q = query(storageRef, where("displayName", "==", username));

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
    //used to set the found document to the variable we declared
  };

  //this function is used to catch the click event(enter)
  const handleKey = (e) => {
    e.key === "Enter" && serachUser();
  };

  //this function is used to show or create a chat when clicked. 
  //if there are no chats it creates a new chat id between the two users.
  const handleSelect = async () => {
    //check whether user exists if not create else select the chats  of that user with the current user
    //combinedId is the chat id between two users
    const combinedId =
      currentuser.uid > user.uid
        ? currentuser.uid + user.uid
        : user.uid + currentuser.uid;
    try {
      //to get the chats between the two users
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chats collection
        //if the chat not exists a chat space is created between the users
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //to update the details value of current user
        const update = await updateDoc(doc(db, "userChats", currentuser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoUrl: user.photoUrl,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        console.log(update);

        //to update the detail of user searched
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentuser.uid,
            displayName: currentuser.displayName,
            photoURL: currentuser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        console.log(combinedId + ".userInfo");
      }
    } catch (err) {
      console.log(err);
    }
    setUser(null);
    setUsername("");
  };

  return (
    <div>
      <input
        type="search"
        name="search"
        id="search"
        placeholder="Search user"
        className="bg-transparent focus:bg-none outline-none placeholder:text-white"
        value={username}
        onKeyDown={handleKey}
        onChange={(e) => setUsername(e.target.value)}
      />
      {err && <p>User not Found</p>}

      {user && (
        <div className="hover:bg-[#54739f] mt-5 mb-4" onClick={handleSelect}>
          <div className="flex gap-4 items-center">
            <img
              src={user.photoUrl}
              alt=""
              className="w-[60px] h-[60px] rounded-[50%]"
            />
            <div className="flex flex-col">
              <h1 className="text-xl text-white">{user.displayName}</h1>
              <p className="text-white">Hello</p>
            </div>
          </div>
        </div>
      )}
      <hr />
    </div>
  );
};

export default Search;
