import React, { useContext, useState } from "react";
import { Header } from "../src/components/Header";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import { UserPost } from "./components/UserPost";
import { Link, useNavigate } from "react-router-dom";
// import SettingsIcon from "@mui/icons-material/Settings";
import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import Tooltip from "@mui/material/Tooltip";
import { AuthContext } from "./Context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import { Followers } from "./components/Followers";

export const UserProfile = () => {
  const [ShowFollowers, setShowFollowers] = useState(false);
  const [ShowFollowing, setShowFollowing] = useState(false);
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const navigate = useNavigate();

  const logOut = async () => {
    let res = await axios.get("/auth/logout");
    console.log(res.data);
    if (res.status === 200) {
      navigate("/auth/login");
      toast.success(res.data.success);
    }
  };
  const deleteAccount = async (ID) => {
    const res = await axios.put(`/user/${user._id}/delete`, {
      userid: user._id,
    });
    if (res.status === 200) {
      navigate("/auth/login");
      toast.success(res.data.success);
    }
    console.log(res);
  };

  return (
    <>
      <div className=" h-screen overflow-y-hidden flex flex-col">
        <Header />
        <div className="user__div md:w-[70%] w-[100%] mx-auto  flex justify-center items-start mt-5 space-x-16 p-1 border-b pb-6 py-2">
          <div className="userProfilePic__div">
            <img
              src={PF + user.profilePicture}
              // src="https://links.papareact.com/jjm"
              alt="profilePic"
              className="h-28 w-28 object-cover border-2 border-red-500 p-1 rounded-full"
            />
          </div>
          <div className="user__description">
            <div className="text">
              <h1 className="userName text-2xl ">{user?.userName}</h1>
              <div className="description mt-2">
                {[
                  user?.city,
                  user?.DateOfBirth,
                  user?.status,
                  user?.education,
                  user?.hobbies,
                ].map((cur, id) =>
                  cur ? (
                    <p key={id} className="text-lg font-lighter">
                      {cur}
                    </p>
                  ) : (
                    <h1>No Bio or personal information available</h1>
                  )
                )}

                <div className="followes__follwing flex justify-center items-center space-x-3 mt-2">
                  
                  <p
                    onClick={() => setShowFollowers(true)}
                    className="md:text-xl text-sm  bg-gray-200 px-2 py-1 rounded-full font-semibold capitalize cursor-pointer hover:scale-110 transition-all duration-200 ease-out shadow-lg"
                  >
                    followers -{" "}
                    <span className="font-extralight">
                      {user?.followers?.length}
                    </span>
                  </p>
                  
                  <p
                    onClick={() => setShowFollowing(true)}
                    className="md:text-xl text-sm  bg-gray-200 px-2 py-1 rounded-full font-semibold capitalize cursor-pointer hover:scale-110 transition-all duration-200 ease-out shadow-lg"
                  >
                    following -{" "}
                    <span className="font-extralight">
                      {user?.following?.length}
                    </span>
                  </p>
                  
                </div>
              </div>
              <div className="flex items-center space-x-2 ">
                <Tooltip title="Edit profile">
                  <div className="flex-1">
                    <Link to="/editprofile">
                      <button className="bg-gray-200 text-lg w-full flex items-center justify-evenly rounded-full mt-3 shadow-lg">
                        Edit profile
                        <span className="hover:scale-125 transition-all duration-200 ease-in-out">
                          {" "}
                          <ExpandMoreOutlinedIcon className="scale-110 " />
                        </span>
                      </button>
                    </Link>
                  </div>
                </Tooltip>
                <Tooltip title="log out">
                  <div
                    onClick={logOut}
                    className="bg-gray-200 mt-3 py-1 cursor-pointer rounded-full px-3 hover:scale-125 transition-all duration-200 ease-out"
                  >
                    <LogoutOutlinedIcon className="scale-110" />
                  </div>
                </Tooltip>

                <Tooltip title="Delete Account">
                  <div
                    onClick={() => deleteAccount(user._id)}
                    className="bg-gray-200 mt-3 py-1 cursor-pointer rounded-full px-3 hover:scale-125 transition-all duration-200 ease-out"
                  >
                    <DeleteForeverTwoToneIcon className="scale-110" />
                  </div>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-y-auto scroll-smooth">
          <UserPost />
        </div>
      </div>

      {ShowFollowers && (
        <Followers
          setShowFollowers={setShowFollowers}
          id={user?._id}
          followers="follower"
        />
      )}
      {ShowFollowing && (
        <Followers
          setShowFollowers={setShowFollowing}
          id={user?._id}
          following="following"
        />
      )}
    </>
  );
};
