import React, { useContext, useRef, useState } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import loginValidator from "../utils/loginvalidator";
import signupValidator from "../utils/signupValidator"; //use this validtor for the sigup currently iam using login validatort 
import { useNavigate } from "react-router-dom";
import userContext from "../utils/usecontext";
import { auth, store } from "../utils/Firebase";
import {collection} from "firebase/firestore";
import {} from "../utils/Firebase";
const Login = () => {
  const logindet = useContext(userContext);
  const navigate = useNavigate();

  const [warning, setWarning] = useState("");

  const fname = useRef(null);
  const lname = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const cpassword = useRef(null);

  const [isLogin, setIslogin] = useState(true);
  const toggleFn = () => {
    setWarning("");
    setIslogin(!isLogin);
  };

  const desc = collection(store, "User");

  const handleLogin = async () => {
    const valresult = loginValidator(
      email.current.value,
      password.current.value
    );
    console.log(valresult);
    if (valresult != null) {
      setWarning(valresult);
    } else {
      try {
        signInWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        )
          .then((userCredential) => {
            const user = userCredential.user;
            const {displayName } = user;
            logindet.setLoggedIn(displayName);
            navigate("/");
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setWarning(errorCode + " : " + errorMessage);
          });
      } catch (error) {}
    }
  };

  const handleSubmit = async () => {
    const valresult = loginValidator(
      email.current.value,
      password.current.value
    );
    console.log(valresult);
    if (valresult != null) {
      setWarning(valresult);
    } else {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;

          updateProfile(user, {
            displayName: fname.current.value,
          })
            .then(() => {
              setWarning("");
              setIslogin(!isLogin);
              navigate("/login");
            })
            .catch((error) => {
              console.log("error happend");
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setWarning(error.message);
        });
    }
  };

  if (!isLogin) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white rounded-md shadow-md">
          <h1 className="text-2xl font-semibold mb-6 text-center">Register</h1>
          <form className="flex flex-col space-y-4">
            <input
              ref={fname}
              type="text"
              placeholder="First Name"
              className="p-3 text-lg outline-none border rounded-md focus:border-blue-500"
            />
            <input
              ref={lname}
              type="text"
              placeholder="Last Name"
              className="p-3 text-lg outline-none border rounded-md focus:border-blue-500"
            />
            <input
              ref={email}
              type="email"
              placeholder="Email"
              className="p-3 text-lg outline-none border rounded-md focus:border-blue-500"
            />
            <input
              ref={password}
              type="password"
              placeholder="Password"
              className="p-3 text-lg outline-none border rounded-md focus:border-blue-500"
            />
            <input
              ref={cpassword}
              type="password"
              placeholder="Confirm Password"
              className="p-3 text-lg outline-none border rounded-md focus:border-blue-500"
            />
            {warning !== "" && (
              <h4 className="text-center text-red-500 mt-4 mb-4">{warning}</h4>
            )}

            <button
              type="button"
              className="w-full p-3 text-lg font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-700 transition duration-300"
              onClick={handleSubmit}
            >
              Register
            </button>
          </form>
          <div className="mt-4 text-center">
            <span className="text-gray-700">Already have an account? </span>
            <p
              href="/login"
              className="text-blue-500 hover:underline cursor-pointer"
              onClick={toggleFn}
            >
              Login here
            </p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-md shadow-md">
        <div className="flex justify-center mb-6">
          <img
            src="https://statics.olx.in/external/base/img/loginEntryPointFavorite.webp"
            alt="OLX Login"
            className="w-24 h-24"
          />
        </div>
        <h1 className="text-xl font-semibold mb-6 text-center">
          Close deal from the comfort <br /> of your home
        </h1>
        <form className="flex flex-col space-y-4">
          <input
            ref={email}
            type="email"
            placeholder="Enter Email"
            className="p-3 text-lg outline-none border rounded-md focus:border-blue-500"
          />
          <input
            ref={password}
            type="password"
            placeholder="Enter Password"
            className="p-3 text-lg outline-none border rounded-md focus:border-blue-500"
          />
          {warning !== "" && (
            <h4 className="text-center text-red-500 mt-4 mb-4">{warning}</h4>
          )}
          <button
            type="button"
            className="w-full p-3 text-lg font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-700 transition duration-300"
            onClick={handleLogin}
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <span className="text-gray-700">Don't have an account? </span>
          <p
            className="text-blue-500 hover:underline cursor-pointer"
            onClick={toggleFn}
          >
            Register here
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
