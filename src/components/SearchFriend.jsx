import { Avatar } from "@mui/material";
import axios from "axios";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

export const SearchFriend = ({
  setFriend,
  setSearchFriend,
  Data,
  searchFriend,
}) => {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const unfollow = async (id) => {
    let result = await axios.put(`https://instagramserver-2.herokuapp.com/api/user/${id}/unfollow`, { userId: user._id });
  };
  const follow = async (id) => {
    console.log("clicked");
    let result = await axios.put(`https://instagramserver-2.herokuapp.com/api/user/${id}/follow`, { userId: user._id });
  };

  console.log(Data);

  return (
    <div
      onClick={() => {
        setFriend("");
        setSearchFriend("");
      }}
      className="bg-transparent opacity-100 z-10 backdrop-blur-lg  w-full h-screen absolute top-0"
    >
      <div className="bg-transparent relative md:w-[55%] w-[90%] mx-auto top-20 h-[40%] p-2 rounded-md overflow-y-auto scroll-smooth">
        {Data.length > 0 ? (
          <>
            {Data.map((cur, id) => (
              <div className="flex justify-around items-center py-3 px-4 mt-5 shadow-lg rounded-md">
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
                      <p className="dec text-lg">{cur.status}, {cur.education}</p>
                    </div>
                  </div>
                </Link>

                {cur.followers.includes(user._id) ? (
                  <button
                    onClick={() => unfollow(cur._id)}
                    className="text-blue-500 text-xl font-semibold hover:text-blue-400 transition-all duration-200 ease-in-out"
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    onClick={() => follow(cur._id)}
                    className="text-blue-500 text-xl font-semibold hover:text-blue-400 transition-all duration-200 ease-in-out"
                  >
                    Follow
                  </button>
                )}
              </div>
            ))}
          </>
        ) : (
          <>
            <h1>no user found "{searchFriend}"</h1>
          </>
        )}
      </div>
    </div>
  );
};
