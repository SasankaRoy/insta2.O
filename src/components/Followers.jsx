import { Avatar } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

export const Followers = ({ setShowFollowers, id, following, followers }) => {
  const [friends, setFriends] = useState([]);
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  useEffect(() => {
    const getFollower = async () => {
      let friends = await axios.get(
        `https://instagramserver-2-0.onrender.com/api/user/friend/${id}/follower`
      );
      setFriends(friends.data);
    };
    const getFollowing = async () => {
      let friends = await axios.get(
        `https://instagramserver-2-0.onrender.com/api/user/friend/${id}/following`
      );
      setFriends(friends.data);
    };
    if (followers === "follower") {
      getFollower();
    }
    if (following === "following") {
      getFollowing();
    }
  }, [user?._id]);

  return (
    <div
      onClick={() => setShowFollowers(false)}
      className="h-screen w-full bg-transparent opacity-100 z-10 backdrop-blur-lg absolute top-0"
    >
      <div className="relative bg-transparent md:w-[55%] w-[90%] mx-auto top-20 h-[40%] p-2 rounded-md overflow-y-auto scroll-smooth">
        {friends.map((cur, id) => (
          <div
            key={id}
            className="flex justify-around items-center py-3 px-4 mt-5 shadow-lg rounded-md"
          >
            <Link
              className="flex justify-center items-center"
              to={`/${cur.userName}/profile`}
            >
              <div className="user__div flex flex-1 justify-start items-center cursor-pointer">
                <div className="userImg__div scale-150 mr-5 border-2 border-red-500 p-[1.5px] rounded-full">
                  <Avatar src={PF + cur.profilePicture} />
                </div>
                <div className="userdel__div">
                  <h1 className="userName md:text-[28px] text-2xl font-normal">
                    {cur.userName}
                  </h1>
                </div>
              </div>
            </Link>
          </div>
        ))}
        {!friends.length > 0 && (
          <h1 className=" text-4xl mt-5 font-light">No users found</h1>
        )}
      </div>
    </div>
  );
};
