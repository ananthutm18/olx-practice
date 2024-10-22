import React, { useContext, useRef } from "react";
import userContext from "../utils/usecontext";
import { MdAdd } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import logo from "../assets/logo.png";
import { FaUserCircle } from "react-icons/fa";
import { signOut } from "firebase/auth";
import { useNavigate} from "react-router-dom";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/Firebase";
const Header = () => {
  const logind = useContext(userContext);
  const product = useContext(userContext);
  const navigate = useNavigate();
  const user = useContext(userContext);

  useEffect(() => {
    const unsucrbe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const {email, displayName } = user;
        logind.setUser(email);
        logind.setLoggedIn(displayName);
        navigate("/");
      } else {
        navigate("/login");
      }
    });

    return () => unsucrbe();
  }, []);

  const handleSignout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        logind.setLoggedIn(null);
        user.setsearch("");

        navigate("/login");
      })
      .catch((error) => {
        navigate("/error"); //need to make error page
      });
  };


  const svalue =useRef()

  const sellFn = () => {
    if (logind.isLoggedin !== null) {
      navigate("/sellproduct");
    } else {
      user.setneedlogin(true);
    }
  };
  const handleclick = () => {
    product.setsearch(svalue.current.value);
    navigate("/");
   
  };

  const loginFn = () => {
    navigate("/login");
  };
  return (
    <div className="bg-slate-200 flex justify-between items-center px-5 py-2">
      <div
        className="cursor-pointer"
        onClick={() => {
          product.setsearch("");
          navigate("/");
        }}
      >
        <img src={logo} alt="" className="w-20 bg-slate-200" />
      </div>
      <div className="flex w-11/12 justify-end gap-10">
        <div className="flex w-6/12">
          {logind.isLoggedin != null && (
            <input
              type="text"
              placeholder="seach items.."
              className="w-full outline-none border-2 border-black rounded-l-md px-3 text-lg"
              ref={svalue}
              onChange={handleclick}
            />
          )}
          {logind.isLoggedin != null && (
            <button
              className="bg-black text-gray-50 text-2xl px-3 py-3 rounded-r-md"
              onClick={handleclick}
            >
              <IoSearchOutline />
            </button>
          )}
        </div>
        <div className="flex gap-10">
          {logind.isLoggedin != null && (
            <div className="flex mt-4 font-bold text-lg">
              <h1 className="mt-1">
                {" "}
                <FaUserCircle />
              </h1>{" "}
              <h1 className="mt-0"> {logind.isLoggedin}</h1>
            </div>
          )}
           {logind.isLoggedin == null && (<button className="text-md font-semibold underline" onClick={loginFn}>
            LOGIN
          </button>)}

          {logind.isLoggedin != null && ( <button
            className="text-md font-semibold underline"
            onClick={handleSignout}
          >
            Logout
          </button>)}

          <div className="flex items-center gap-1 border-4 border-cyan-800 rounded-full px-5 py-1 mr-3 bg-white">
            <span className="font-extrabold text-xl">
              <MdAdd />{" "}
            </span>
            <button className="text-md font-bold" onClick={sellFn}>
              SELL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
