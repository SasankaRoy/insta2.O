import { Avatar } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import SentimentSatisfiedAltOutlinedIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";

export const Timeline = ({ data, userdata }) => {
  const [like, setLike] = useState(data.likes.length);
  const [islike, setIslike] = useState(false);
  const coment = useRef("");
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const { user } = useContext(AuthContext);
  useEffect(() => {
    setIslike(data.likes.includes(user._id));
  }, [data.likes, user._id]);
  const likeAndUnlike = async (PostId) => {
    try {
      let Like = await fetch(`https://instagramserver-2.herokuapp.com/api/post/${PostId}/like`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user._id }),
      });
      let data = await Like.json();
      console.log(data);
      setLike(!islike ? like + 1 : like - 1);
      setIslike(!islike);
    } catch (error) {
      console.log(error);
    }
  };

  const sendComment = async (PostId) => {
    try {
      let comment = coment.current.value;
      let res = await axios.put(`https://instagramserver-2.herokuapp.com/api/post/${PostId}/comment`, {
        userName: user?.userName,
        comment,
      });
      console.log(res.data);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="my-0 rounded-lg bg-white border-b">
        {/* who posted the post or the user */}
        <div className="header__part px-2 py-2  flex justify-center items-center">
          <div className="flex-1 px-1 ">
            <Link
              className="flex justify-start items-center"
              to={`/${userdata.userName}/profile`}
              //to="/"
            >
              {" "}
              <Avatar
              //scr={User?.profilePicture}
              />
              <div className="flex flex-col justify-start items-start">
                <p className="text-gray-700 pl-2">{userdata?.userName}</p>
                <span className="text-md text-gray-700 pl-2">
                  {format(userdata.createdAt)}
                </span>
              </div>
            </Link>
          </div>

          <MoreHorizOutlinedIcon className="h-10 cursor-pointer" />
        </div>
        {/* the post */}
        <img
          src={PF + data.image}
          onClick={() => likeAndUnlike(data._id)}
          className="object-contain w-full cursor-pointer"
          
          alt="feed__post"
        />
        <div className="w-full description text-lg p-1 cursor-not-allowed">
          {data.dec}
        </div>
        {/* button's */}
        <div className="button__div mt-3 flex justify-between px-3 items-center">
          <div className="flex justify-center items-center space-x-3">
            {islike ? (
              <FavoriteOutlinedIcon
                onClick={() => likeAndUnlike(data._id)}
                className="cursor-pointer text-red-500"
              />
            ) : (
              <FavoriteOutlinedIcon
                onClick={() => likeAndUnlike(data._id)}
                className="cursor-pointer"
              />
            )}

            <ChatBubbleOutlineRoundedIcon className="cursor-pointer" />
            <SendIcon className="cursor-pointer -rotate-12" />
          </div>
          <BookmarkBorderIcon className="cursor-pointer" />
        </div>
        {/* like's */}
        {data.likes ? (
          <>
            {islike ? (
              <span className="likes ml-3 text-xl">
                {" "}
                {like} people
                <FavoriteOutlinedIcon className="text-red-500 scale-90" /> it
              </span>
            ) : (
              <>
                <span className="likes ml-3 text-xl">
                  {" "}
                  {like} people
                  <FavoriteOutlinedIcon className="text-red-500 scale-90" /> it
                </span>
              </>
            )}
          </>
        ) : (
          <></>
        )}

        {/* comment's */}
        <div className="overflow-y-scroll h-20 scrollbar-thin  scrollbar-thumb-black scroll-smooth rounded-lg bg-white p-4">
          {data.comments.length === 0 ? (
            <></>
          ) : (
            <div className="overflow-y-scroll h-20 scrollbar-thin  scrollbar-thumb-black scroll-smooth rounded-lg bg-white p-4">
              {data.comments.map((curr, i) => (
                <div
                  key={i}
                  className="flex truncate justify-between  items-center"
                >
                  <div className="flex justify-center items-center">
                    <div>
                      <img
                        className="object-contain h-8 rounded-full"
                        src="https://links.papareact.com/jjm"
                        alt="userPic"
                      />
                    </div>
                    <h1 className="text-lg font-normal px-4 py-2">
                      {curr?.userName}
                      <span className="font-semibold ml-1 text-md">
                        {curr.comment}
                      </span>
                    </h1>
                  </div>
                  {/* <Moment fromNow className="text-sm font-normal">
                  {cur.data().timeStamp?.toDate()}
                </Moment> */}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* input section */}
        <form className="flex p-5 items-center">
          <SentimentSatisfiedAltOutlinedIcon className="h-7" />
          <input
            type="text"
            ref={coment}
            className="flex-1 focus:ring-0 outline-none border-none"
            placeholder="Add a comment..."
          />
          <button
            type="submit"
            onClick={() => sendComment(data._id)}
            className="font-semibold text-blue-500 text-lg"
          >
            Post
          </button>
        </form>
      </div>
    </>
  );
};
