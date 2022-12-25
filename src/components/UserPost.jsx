import React, { useContext, useEffect, useState } from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import OndemandVideoOutlinedIcon from "@mui/icons-material/OndemandVideoOutlined";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";

export const UserPost = () => {
  const [allPost, setAllPost] = useState([]);
  const { user } = useContext(AuthContext);
  let PF = process.env.REACT_APP_PUBLIC_FOLDER;
  useEffect(() => {
    const getAllPost = async () => {
      let post = await axios.get(`/post/${user.userName}/posts`);
      // console.log(post.data);
      setAllPost(post.data.posts);
    };
    getAllPost();
  }, [user.userName]);

  return (
    <>
      {allPost ? (
        <>
          <div
            className="mt-3 text-center md:w-[70%]
      w-[100%] mx-auto flex flex-col  justify-center items-center
      space-x-5 p-3"
          >
            <div
              className="icons__div flex border-b-2 border-t-2
        justify-evenly items-center w-full"
            >
              <div className=" py-3 hover:scale-125 transition-all duration-200 ease-in-out cursor-pointer  rounded-md">
                <AppsOutlinedIcon />
              </div>
              <div className=" py-3 hover:scale-125 transition-all duration-200 ease-in-out cursor-pointer  rounded-md">
                <OndemandVideoOutlinedIcon />
              </div>
              <div className=" py-3 hover:scale-125 transition-all duration-200 ease-in-out cursor-pointer  rounded-md">
                <AccountCircleOutlinedIcon />
              </div>
            </div>
            <div className="posts__div mt-3 mx-auto flex flex-wrap justify-center items-center w-full">
              {allPost.map((cur, id) => (
                <div
                  key={id}
                  className="AppsOutlinedIcon__div  m-1 cursor-pointer w-[75%]"
                >
                  <img
                    src={PF + cur.image}
                    alt="img"
                    className="object-cover w-auto h-auto"
                  />
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <h1>Share some post to see !</h1>
      )}
    </>
  );
};
