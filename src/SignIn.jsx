import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import EmailValidator from "email-validator";
// import toast from 'react-hot-toast';
import { toast } from "react-toastify";
import axios from "axios";
export const SignIn = () => {
  const [userDel, setUserDel] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInput = (event) => {
    let { name, value } = event.target;
    setUserDel({
      ...userDel,
      [name]: value,
    });
  };
  const registerUser = async () => {
    let { name, email, password } = userDel;
    try {
      if (!name || !email || !password) {
        console.error("Please enter the Deltails to processed");
        return;
      }
      if (!EmailValidator.validate(email)) {
        toast.error("Please enter a valid email !!");
        return;
      }
      if (password.length <= 4) {
        toast.error("password  content at least 4 char");
        return;
      } else {
        // const register = await fetch("https://instagramserver-2.herokuapp.com/api/auth/signin", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify(userDel),
        //   mode:'cors'
        // });
        const register = await axios.post(
          `https://instagramserver-2.herokuapp.com/api/auth/signin`,
          { userDel }
        );
        let res = await register.data;

        if (register.status === 400) {
          toast.error(res.error);
          return;
        }
        if (register.status === 404) {
          toast.error(res.error);
          return;
        }
        if (register.status === 200) {
          navigate("/auth/login");
          toast.success("Registered successfully");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <head>
        <title>Instagram-2.O - SignIn</title>
        <meta
          title="Instagram clone"
          content="Insta clone by nextJs tailwindCss reatJs fireBase nextAuthJs"
        />
        <meta
          name="sasanka"
          content="A web developer and software developer. Building awsome UI/UX with greate user experience"
        />
      </head>
      <div className="singin h-screen">
        <div className="flex max-w-max   m-auto justify-center items-center">
          <div className="mt-10">
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
        </div>
        <div className="fromFilds mt-10 p-3 md:w-[50%] w-[90%] m-auto  rounded-md shadow-md">
          <div className="flex flex-col p-1">
            <label
              htmlFor="name"
              className="text-xl m-1 font-normal text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              className="bg-gray-50 placeholder:text-gray-500 shadow-md w-full block pl-1 py-2 sm:text-sm border-gray-300 rounded-md focus:ring-black focus:border-black"
              placeholder="Enter username"
              name="name"
              onChange={handleInput}
              value={userDel.name}
            />
          </div>
          <div className="flex flex-col p-1">
            <label
              htmlFor="name"
              className="text-xl m-1 font-normal text-gray-700"
            >
              Email
            </label>
            <input
              type="text"
              className="bg-gray-50 placeholder:text-gray-500 shadow-md w-full block pl-1 py-2 sm:text-sm border-gray-300 rounded-md focus:ring-black focus:border-black"
              placeholder="Enter email"
              name="email"
              onChange={handleInput}
              value={userDel.email}
            />
          </div>
          <div className="flex flex-col p-1">
            <label
              htmlFor="name"
              className="text-xl m-1 font-normal text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              className="bg-gray-50 shadow-md placeholder:text-gray-500 w-full block pl-1 py-2 sm:text-sm border-gray-300 rounded-md focus:ring-black focus:border-black"
              placeholder="Enter password"
              name="password"
              onChange={handleInput}
              value={userDel.password}
            />
          </div>

          <button
            onClick={registerUser}
            className=" singInBtn w-full bg-blue-500 shadow-md text-white font-medium py-1 text-2xl mt-3 rounded-full"
          >
            Sign In
          </button>

          <h3 className="flex justify-center items-center mt-4 text-lg font-semibold text-gray-700 mb-1">
            Or
          </h3>
          <Link to="/auth/login">
            <button className=" singInBtn w-full bg-blue-500 shadow-md text-white font-medium py-1 text-2xl mt-3 rounded-full">
              Log In
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};
