import "./auth.css";
import Google from "../assets/images/google.svg";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../config/Firebase.config";

const Login = () => {
  const [err, setErr] = useState(false);
  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    console.log(email, password);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      Navigate("/chat");
    } catch (err) {
      setErr(true);
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider)
      .then((res) => {
        Navigate("/chat");
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex flex-col items-center justify-center mt-40">
      <div className="flex flex-col items-center justify-center gap-10 inner-div w-[25%]">
        <h1 className="text-2xl font-bold line-clamp-2 text-[#1F2937">Login</h1>
        <form
          action="/login"
          method="post"
          className="flex flex-col items-center"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            className="rounded-lg p-3 bg-transparent border-b-[2px] border-[#1F2937] outline-none"
          />

          <br />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="rounded-lg p-3 bg-transparent border-b-[2px] border-[#1F2937] outline-none"
          />
          <br />
          <button className="bg-[#9F60FE] text-white w-20 p-3 rounded-2xl cursor-pointer">
            Login
          </button>
          <div className="flex mt-3 gap-2 bg-[#9F60FE] text-white p-3 rounded-2xl cursor-pointer">
            <img src={Google} alt="" />
            <button onClick={handleClick}>Login with google</button>
          </div>
          <div className="mt-8">
            Dont Have an account?{" "}
            <Link to="/signup" className="text-lg text-[#9F60FE] font-semibold">
              {"Sign up"}
            </Link>
          </div>
          {err && (
            <p className="mt-5 text-red-700">Something went Wrong!!!!!</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
