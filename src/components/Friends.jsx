import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import { Avatar } from "@mui/material";

export const Friends = ({ friend }) => {
  // console.log(friend);
  const { user } = useContext(AuthContext);
  // const [currentConversation,setCurrentConversation] = useState('')
  const [frd, setfrd] = useState("");

  useEffect(() => {
    try {
      let friendId = friend.member.find((f) => f !== user._id);
      // console.log(friendId)
      const getAFriend = async () => {
        let result = await axios.get(
          `https://instagramserver-2-0.onrender.com/api/user/${friendId}`
        );
        setfrd(result.data);
        // console.log(result.data);
      };
      getAFriend();
    } catch (error) {
      console.log(error);
    }
  }, [friend.member]);

  return (
    <>
      <Link
        to={`/profile/messages/${friend._id}?userName=${frd?.userName}&friendId=${frd._id}`}
      >
        <div className="first:mt-5 truncate flex mt-3 py-2 px-10 space-x-5 items-center rounded-md  shadow-md hover:bg-gray-100  transition-all duration-100 ease-out  cursor-pointer">
          <div className="avatar scale-125 ">
            <Avatar
              src={process.env.REACT_APP_PUBLIC_FOLDER + frd?.profilePicture}
            />
          </div>
          <div className="names text-gray-500 ">
            <h1 className="text-2xl">{frd?.userName}</h1>
          </div>
        </div>
      </Link>
    </>
  );
};
