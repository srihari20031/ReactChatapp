import Google from "../assets/images/google.svg";
import Camera from "../assets/images/camera.svg";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
import { auth, provider, db } from "../config/Firebase.config";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";


const storage = new getStorage();

const Signup = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log(res);
      const date = new Date().getTime();
      // ref is used to store the detail in the database
      const storageRef = ref(storage, `${displayName + date}`);
      const uploadTask = uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //update profile is used to update the user  profile by adding a cover image
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoUrl: downloadURL,
            });
            await setDoc(doc(db, "userChats", res.user.uid), {});

            Navigate("/chat");
          } catch (err) {
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };

  const [type, setType] = useState("password");
  const [eye, setEye] = useState(true);

  const handleToggle = () => {
    if (type === "password") {
      setType("text");
      setEye(!eye);
    } else {
      setType("password");
      setEye(!eye);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center mt-40">
      <div className="flex flex-col items-center justify-center gap-10 inner-div w-[30%]">
        <h1 className="text-2xl">Sign Up</h1>
        <form
          action="/login"
          method="post"
          className="flex flex-col items-center"
          onSubmit={handleSubmit}
        >
          <input
            required
            type="text"
            name="display name"
            placeholder="Display name"
            className="rounded-lg p-3 bg-transparent border-b-[2px] border-[#1F2937] outline-none"
          />
          <br />
          <input
            required
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            className="rounded-lg p-3 bg-transparent border-b-[2px] border-[#1F2937] outline-none"
          />
          <br />
          <div className="flex items-center border-b-[2px] border-[#1F2937] rounded-lg">
            <input
              required
              type={type}
              name="password"
              id="password"
              placeholder="Password"
              className="p-3 bg-transparent  outline-none max-w-[310px]"
            />
            {eye ? (
              <Icon
                icon="ion:eye-off"
                onClick={handleToggle}
                className="text-3xl"
              />
            ) : (
              <Icon
                icon="ion:eye"
                onClick={handleToggle}
                className="text-3xl"
              />
            )}
          </div>
          <br />

          <label
            htmlFor="file"
            className="flex gap-2 items-center w-40 justify-center"
          >
            <img src={Camera} alt="" />
            <input
              id="file"
              type="file"
              className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-[black] file:text-white
      hover:file:bg-[#9F60FE]"
            />
          </label>

          <br />
          <button className="bg-[#9F60FE] text-white w-20 p-3 rounded-2xl cursor-pointer">
            Signup
          </button>
          <div className="flex mt-3 gap-2  bg-[#9F60FE] text-white p-3 rounded-2xl cursor-pointer">
            <img src={Google} alt="" />
            <button>Signup with google</button>
          </div>

          <div className="mt-8">
            Already have an account?{" "}
            <Link to="/login" className="text-lg text-[#9F60FE] font-semibold">
              {"Log in"}
            </Link>
          </div>
          {loading && "Uploading and compressing the image please wait..."}
          {err && <p> Something Went Wrong </p>}
        </form>
      </div>
    </div>
  );
};

export default Signup;
