import { Tooltip } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Header } from "./Header";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";

import { Timeline } from "./Timeline";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import { Followers } from "./Followers";

export const Profiles = () => {
  const [userData, setUserData] = useState({});
  const [userPost, setUserPost] = useState([]);
  const [ShowFollowers, setShowFollowers] = useState(false);
  const [ShowFollowing, setShowFollowing] = useState(false);
  const { username } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const fetchUser = async () => {
      const data = await fetch(`https://instagramserver-2.herokuapp.com/api/post/${username}/posts`,{mode:'cors'});
      const response = await data.json();
      if (data.status === 200) {
        setUserData(response.userData);
        setUserPost(
          response.posts.sort((post1, post2) => {
            return new Date(post2.createdAt) - new Date(post1.createdAt);
          })
        );
      }
    };
    fetchUser();
  }, [username, user]);

  const followUser = async () => {
    let follow = await axios.put(`https://instagramserver-2.herokuapp.com/api/user/${userData._id}/follow`, {
      userId: user._id,
    });
  };
  const unfollow = async () => {
    let follow = await axios.put(`https://instagramserver-2.herokuapp.com/api/user/${userData._id}/unfollow`, {
      userId: user._id,
    });
  };

  const startConversation = async (receiverId) => {
    let result = await axios.post("https://instagramserver-2.herokuapp.com/api/conversation", {
      senderId: user._id,
      receiverId,
    });
    if (result.status === 200) {
      navigate("/profile/messages");
    }
  };

  return (
    <>
      <head>
        <title>Instagram 2.O - {username}</title>
      </head>
      <div className="profile h-screen overflow-hidden flex flex-col">
        <Header />
        <div className="user__div md:w-[70%] w-[100%] mx-auto  flex justify-center items-start mt-5 space-x-16 p-1 border-b pb-6 py-2">
          <div className="userProfilePic__div">
            <img
              src={PF + userData?.profilePicture}
              // src="https://links.papareact.com/jjm"
              alt="profilePic"
              className="h-28 w-28 object-cover border-2 border-red-500 p-1 rounded-full"
            />
          </div>
          <div className="user__description">
            <div className="text">
              <h1 className="userName text-2xl ">{userData?.userName}</h1>
              <div className="description mt-2">
                {[
                  userData?.city,
                  userData?.DateOfBirth,
                  userData?.status,
                  userData?.education,
                  userData?.hobbies,
                ].map((cur, id) =>
                  cur ? (
                    <p key={id} className="text-lg font-lighter">
                      {cur}
                    </p>
                  ) : (
                    <h1 className="text-gray-300 text-lg font-light">
                      No Bio or personal information available
                    </h1>
                  )
                )}

                <div className="followes__follwing flex justify-center items-center space-x-3 mt-2">
                  {" "}
                  <p
                    onClick={() => setShowFollowers(true)}
                    className="md:text-xl text-sm  bg-gray-200 px-2 py-1 rounded-full font-semibold capitalize cursor-pointer hover:scale-110 transition-all duration-200 ease-out shadow-lg"
                  >
                    followers -{" "}
                    <span className="font-extralight">
                      {userData?.followers?.length}
                    </span>
                  </p>
                  
                    {" "}
                    <p
                      onClick={() => setShowFollowing(true)}
                      className="md:text-xl text-sm  bg-gray-200 px-2 py-1 rounded-full font-semibold capitalize cursor-pointer hover:scale-110 transition-all duration-200 ease-out shadow-lg"
                    >
                      followings -{" "}
                      <span className="font-extralight">
                        {userData?.following?.length}
                      </span>
                    </p>
                  
                </div>
              </div>
              <div className="flex items-center space-x-2 ">
                <div className="flex-1">
                  {userData._id === user._id ? (
                    <Tooltip title="Edit profile">
                      <Link to="/">
                        <button
                          className="bg-gray-200 hover:scale-110
                       text-lg   w-full flex items-center
                       justify-evenly rounded-full mt-3 shadow-lg transition-all
                       duration-200 ease-out"
                        >
                          Edit profile
                          <ExpandMoreOutlinedIcon className="scale-110 " />
                        </button>
                      </Link>
                    </Tooltip>
                  ) : (
                    <>
                      {userData?.followers?.includes(user._id) ? (
                        <Tooltip title="unFollow">
                          <button
                            className="bg-gray-200 hover:scale-110
                            text-lg  text-blue-500 w-full flex items-center
                            justify-evenly rounded-full mt-3 shadow-lg transition-all
                            duration-200 ease-out"
                            onClick={unfollow}
                          >
                            UnFollow
                          </button>
                        </Tooltip>
                      ) : (
                        <Tooltip title="Follow">
                          <button
                            className="bg-gray-200 hover:scale-110
                            text-lg  text-blue-500 w-full flex items-center
                            justify-evenly rounded-full mt-3 shadow-lg transition-all
                            duration-200 ease-out"
                            onClick={followUser}
                          >
                            Follow
                          </button>
                        </Tooltip>
                      )}
                    </>
                  )}
                </div>
                {userData._id === user._id ? (
                  <Tooltip title="LogOut">
                    <div
                      className="bg-gray-200 mt-3 py-1
                   cursor-pointer rounded-full px-3
                    hover:scale-125 transition-all
                     duration-200 ease-out"
                    >
                      <LogoutOutlinedIcon className="scale-110" />
                    </div>
                  </Tooltip>
                ) : (
                  <Tooltip title="Message">
                    <div
                      onClick={() => startConversation(userData?._id)}
                      className="bg-gray-200 mt-3 py-1
                   cursor-pointer rounded-full px-3
                    hover:scale-125 transition-all
                     duration-200 ease-out"
                    >
                      <SendOutlinedIcon className="scale-110 -rotate-12" />
                    </div>
                  </Tooltip>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="usertimeline md:w-[70%] w-[100%] mx-auto overflow-y-scroll scroll-smooth scrollbar-none">
          <div className="w-[60%] mx-auto">
            {!userPost.length <= 0 ? (
              <>
                {userPost.map((cur, id) => (
                  <Timeline key={id} data={cur} userdata={userData} />
                ))}
              </>
            ) : (
              <>
                <h1 className="text-center mt-4 mb-4 text-xl shadow-lg shadow-gray-200 w-max mx-auto p-2 rounded">
                  No post available on the timeline!
                </h1>
              </>
            )}
          </div>
        </div>
      </div>
      {ShowFollowers && (
        <Followers
          followers="follower"
          setShowFollowers={setShowFollowers}
          id={userData?._id}
        />
      )}
      {ShowFollowing && (
        <Followers
          following="following"
          setShowFollowers={setShowFollowing}
          id={userData?._id}
        />
      )}
    </>
  );
};
