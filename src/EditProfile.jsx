import React, { useContext, useRef, useState } from "react";
import { Header } from "./components/Header";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import axios from "axios";
import { AuthContext } from "./Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

export const EditProfile = () => {
  const filePickerRef = useRef(null);
  const { user } = useContext(AuthContext);
  const [changeProfilePic, setChangeProfilePic] = useState();
  const [changing, setChanging] = useState(false);
  const [File, setFile] = useState();

  const [newDel, setNewDel] = useState({
    userName: user?.userName,
    email: user?.email,
    city: user?.city,
    status: user?.status,
    education: user?.education,
    hobbies: user?.hobbies,
    DateOfBirth: user?.DateOfBirth,
  });
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const navigate = useNavigate();

  // console.log(user);

  const handleInput = (E) => {
    const { name, value } = E.target;
    setNewDel({ ...newDel, [name]: value });
  };

  const addImagePost = (event) => {
    const fileReader = new FileReader();
    if (event.target.files[0]) {
      setFile(event.target.files[0]);
      fileReader.readAsDataURL(event.target.files[0]);
    }
    fileReader.onload = (readedFile) => {
      setChangeProfilePic(readedFile.target.result);
    };
  };
  const data = new FormData();
  data.append("file", File);
  const uploadProfilePic = async () => {
    setChanging(true);
    let res = await axios.post(
      "https://instagramserver-2-0.onrender.com/api/upload",
      data
    );

    let result = await axios.put(
      `https://instagramserver-2-0.onrender.com/api/user/${user._id}`,
      {
        userid: user._id,
        userName: newDel?.userName,
        email: newDel?.email,
        city: newDel?.city,
        status: newDel?.status,
        DateOfBirth: newDel?.DateOfBirth,
        hobbies: newDel?.hobbies,
        education: newDel?.education,
        profilePicture: File?.name,
      }
    );

    if (result.status === 200) {
      setChanging(false);
      navigate("/");
      window.location.reload();
    }
    // console.log(newDel.userName);
  };

  return (
    <>
      <div className="h-screen">
        <Header />
        <div className="w-[65%] mx-auto h-[90%] flex flex-col  items-center">
          <div className="userProfilePic__div mt-5">
            {changeProfilePic ? (
              <img
                src={changeProfilePic}
                alt="profilePic"
                className="h-28 w-28 object-cover border-2 border-red-500 p-1 rounded-full"
              />
            ) : (
              <img
                src={PF + user.profilePicture}
                // src="https://links.papareact.com/jjm"
                alt="profilePic"
                className="h-28 w-28 object-cover border-2 border-red-500 p-1 rounded-full"
              />
            )}

            <div className="relative left-12 -top-9">
              <div
                onClick={() => filePickerRef.current.click()}
                className="flex mx-auto w-12 h-12
                          items-center justify-center rounded-full
                        bg-red-100 cursor-pointer"
              >
                <CameraAltOutlinedIcon
                  className="w-6 h-6 text-red-500"
                  aria-hidden="true"
                />
              </div>
            </div>
            <div>
              <input
                type="file"
                ref={filePickerRef}
                hidden
                onChange={addImagePost}
              />
            </div>
          </div>
          <div className="input__div md:w-[55%] w-full overflow-y-auto scroll-smooth">
            <h1>Edit your Profile and Deltails</h1>
            <div className="flex flex-col p-1">
              <label
                htmlFor="name"
                className="text-xl m-1 font-normal text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                className="bg-gray-50 text-lg placeholder:text-gray-500 shadow-md w-full block pl-1 py-2  border-gray-300 rounded-md focus:ring-black focus:border-black"
                placeholder="Enter username..."
                name="userName"
                value={newDel.userName}
                onChange={handleInput}
              />
            </div>

            <div className="flex flex-col p-1">
              <label
                htmlFor="email"
                className="text-xl m-1 font-normal text-gray-700"
              >
                Email
              </label>
              <input
                type="text"
                className="bg-gray-50 text-lg placeholder:text-gray-500 shadow-md w-full block pl-1 py-2  border-gray-300 rounded-md focus:ring-black focus:border-black"
                placeholder="Enter email..."
                name="email"
                value={newDel.email}
                onChange={handleInput}
              />
            </div>
            {/* <div className="flex flex-col p-1">
              <label
                htmlFor="password"
                className="text-xl m-1 font-normal text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                className="bg-gray-50 placeholder:text-gray-500 shadow-md w-full block pl-1 py-2 sm:text-sm border-gray-300 rounded-md focus:ring-black focus:border-black"
                placeholder="Enter password..."
                name="password"
              />
            </div> */}

            <hr className="mt-5 mb-1 p-1 bg-gray-200 rounded-full shadow-sm " />

            <div className="flex flex-col p-1">
              <label
                htmlFor="City"
                className="text-xl m-1 font-normal text-gray-700"
              >
                City
              </label>
              <input
                type="text"
                className="bg-gray-50 placeholder:text-gray-500 shadow-md w-full block pl-1 py-2 text-lg border-gray-300 rounded-md focus:ring-black focus:border-black"
                placeholder="Enter your city..."
                name="city"
                value={newDel.city}
                onChange={handleInput}
              />
            </div>

            <div className="flex flex-col p-1">
              <label
                htmlFor="status"
                className="text-xl m-1 font-normal text-gray-700"
              >
                Status/Relationship
              </label>
              <input
                type="text"
                className="bg-gray-50 placeholder:text-gray-500 shadow-md w-full block pl-1 py-2 text-lg border-gray-300 rounded-md focus:ring-black focus:border-black"
                placeholder="Enter your status..."
                name="status"
                value={newDel.status}
                onChange={handleInput}
              />
            </div>
            <div className="flex flex-col p-1">
              <label
                htmlFor="DOB"
                className="text-xl m-1 font-normal text-gray-700"
              >
                BirthDay
              </label>
              <input
                type="text"
                className="bg-gray-50 placeholder:text-gray-500 shadow-md w-full block pl-1 py-2 text-lg border-gray-300 rounded-md focus:ring-black focus:border-black"
                placeholder="DD/MM/YYYY..."
                name="DateOfBirth"
                value={newDel.DateOfBirth}
                onChange={handleInput}
              />
            </div>
            <div className="flex flex-col p-1">
              <label
                htmlFor="education"
                className="text-xl m-1 font-normal text-gray-700"
              >
                Education
              </label>
              <input
                type="text"
                className="bg-gray-50 placeholder:text-gray-500 shadow-md w-full block pl-1 py-2 text-lg border-gray-300 rounded-md focus:ring-black focus:border-black"
                placeholder="Enter  qualification..."
                name="education"
                value={newDel.education}
                onChange={handleInput}
              />
            </div>
            <div className="flex flex-col p-1">
              <label
                htmlFor="Bio"
                className="text-xl m-1 font-normal text-gray-700"
              >
                Hobbies
              </label>
              <textarea
                type="text"
                className="bg-gray-50 placeholder:text-gray-500 shadow-md w-full block pl-2 py-2 text-lg border-gray-300 rounded-md focus:ring-black focus:border-black"
                placeholder=" hobbies ..."
                name="hobbies"
                value={newDel.hobbies}
                onChange={handleInput}
                cols="10"
                rows="5"
              />
            </div>

            {changing ? (
              <button
                onClick={uploadProfilePic}
                className="text-center singInBtn w-full bg-blue-500 shadow-md text-white font-normal py-1 text-2xl mt-3 rounded-full"
              >
                Saving Changes... <CircularProgress color="inherit" />
              </button>
            ) : (
              <button
                onClick={uploadProfilePic}
                className=" singInBtn w-full bg-blue-500 shadow-md text-white font-normal py-1 text-2xl mt-3 rounded-full"
              >
                Save Changes
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
