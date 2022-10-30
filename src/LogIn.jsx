import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import EmailValidator from "email-validator";
import { AuthContext } from "./Context/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";

// "proxy": "https://instagramserver-2.herokuapp.com/api"

export const LogIn = () => {
  const { isFetching, error, dispatch, user } = useContext(AuthContext);
  useEffect(() => {
    fetchuser();
  }, []);
  const fetchuser = async () => {
    let response = await axios.post(`/auth/login`);
    console.log(response.data);
    dispatch({ type: "LOGIN_SUCCESS", payload: response.data.findUser });
  };

  const [users, setUser] = useState({
    name: "",
    password: "",
  });
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const navigate = useNavigate();
  const handleInput = (event) => {
    const { name, value } = event.target;
    setUser({
      ...users,
      [name]: value,
    });
  };
  const checkUser = async () => {
    let { name, password } = users;
    if (!name || !password) {
      toast.error("Plz fill the Deltails");
      return;
    }
    if (!EmailValidator.validate(name)) {
      toast.error("Plz enter a valid email");
      return;
    }

    dispatch({ type: "LOGIN_START" });
    try {
      const loginUrl = await fetch("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailRef.current.value,
          password: passwordRef.current.value,
        }),
      });
      let response = await loginUrl.json();
      if (
        loginUrl.status === 404 ||
        loginUrl.status === 401 ||
        loginUrl.status === 500
      ) {
        dispatch({
          type: "LOGIN_ERROR",
          payload: {
            error: response.error,
          },
        });
        toast.error(response.error);
        return;
      }

      if (loginUrl.status === 200) {
        dispatch({ type: "LOGIN_SUCCESS", payload: response.findUser });
        navigate("/");
        toast.success(`welcome back ${response.findUser.userName}`);

        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <head>
        <title>Instagram-2.O - LogIn</title>
        <meta
          title="Instagram clone"
          content="Insta clone by nextJs tailwindCss reatJs fireBase nextAuthJs"
        />
        <meta
          name="sasanka"
          content="A web developer and software developer. Building awsome UI/UX with greate user experience"
        />
      </head>
      <div className="LogIn flex flex-col h-screen justify-center items-center">
        <div className="Img">
          <h1 className="text-left -mb-5 font-semibold text-2xl">
            Welcome to{" "}
          </h1>
          <img
            src="https://links.papareact.com/ocw"
            className="w-80 h-40 object-contain"
            alt="Instagram Clone"
          />
          <h1 className="text-right -mt-10 font-medium text-lg">Clone</h1>
        </div>
        <div className="Input__box mt-10 pb-2 md:w-[50%] w-[90%]  p-1 rounded-md shadow-md">
          <div className="flex flex-col p-1">
            <label
              htmlFor="Email"
              className="text-xl text-gray-700 m-1 font-normal"
            >
              Email
            </label>
            <input
              type="email"
              onChange={handleInput}
              value={users.name}
              name="name"
              ref={emailRef}
              required
              placeholder="Enter email,username..."
              className="bg-gray-50 placeholder:text-gray-500 text-2xl w-full block pl-1 py-2 shadow-md sm:text-sm border-gray-300 rounded-md focus:ring-black focus:border-black"
            />
          </div>
          <div className="flex flex-col p-1">
            <label
              htmlFor="password"
              className="text-xl m-1 text-gray-700 font-normal"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              onChange={handleInput}
              value={users.password}
              ref={passwordRef}
              required
              placeholder="Enter password..."
              className="bg-gray-50 placeholder:text-gray-500 text-2xl w-full block pl-1 py-2 shadow-md sm:text-sm border-gray-300 rounded-md focus:ring-black focus:border-black"
            />
          </div>
          <button
            onClick={checkUser}
            disabled={isFetching}
            className={`w-full singInBtn bg-blue-500 text-white font-normal shadow-md py-1 text-2xl mt-3 rounded-full disabled:cursor-not-allowed`}
          >
            {isFetching ? <CircularProgress color="inherit" /> : "Log In"}
          </button>
          <h3 className="flex justify-center items-center mt-4 text-lg text-gray-700 font-semibold">
            Or
          </h3>
          <div className="flex space-x-2 ml-10 mb-3 mt-4 items-center justify-start">
            <p className="text-md font-normal ">Create a new account ?</p>
            <Link to="/auth/signin">
              <button className="singInBtn text-2xl font-semibold text-blue-600 transition-all duration-200 ease-out">
                {isFetching ? <CircularProgress color="inherit" /> : "Sign In"}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
