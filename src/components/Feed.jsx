import { Avatar } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import SentimentSatisfiedAltOutlinedIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";
import CancelIcon from "@mui/icons-material/Cancel";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import { useEffect } from "react";
import { format } from "timeago.js";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
export const Feed = ({ Post }) => {
  const [User, setUser] = useState({});
  const [like, setLike] = useState(Post.likes.length);
  const [islike, setIslike] = useState(false);
  const [showInt, setShowInt] = useState(false);
  const [DeletePost, setDeletePost] = useState(false);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const coment = useRef("");
  const { user } = useContext(AuthContext);
  useEffect(() => {
    setIslike(Post.likes.includes(user._id));
  }, [Post.likes, user._id]);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await axios.get(
        `https://instagramserver-2.herokuapp.com/api/user/${Post.userId}`
      );
      // const response = await data.json();
      setUser(data.data);
    };
    fetchUser();
  }, [Post.userId]);

  console.log(Post);

  const likeAndUnlike = async (PostId) => {
    try {
      // let Like = await fetch(`https://instagramserver-2.herokuapp.com/api/post/${PostId}/like`, {
      //   method: "PUT",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ userId: user._id }),
      //   mode:'cors'
      // });
      let Like = await axios.put(
        `https://instagramserver-2.herokuapp.com/api/post/${PostId}/like`,
        { userId: user._id }
      );
      let data = await Like.data;
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
      let res = await axios.put(
        `https://instagramserver-2.herokuapp.com/api/post/${PostId}/comment`,
        {
          userName: user?.userName,
          comment,
        }
      );
      console.log(res.data);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async (postId) => {
    const res = await axios.put(
      `https://instagramserver-2.herokuapp.com/api/post/${postId}/deletepost`,
      {
        userId: user._id,
      }
    );
    if (res.status === 404) {
      toast.error(res.data.error);
    }
    if (res.status === 200) {
      toast.success(res.data.success);
      window.location.reload();
    }
  };

  return (
    <>
      {Post && (
        <div className="my-0 rounded-lg bg-white border-b transition-all duration-200 ease-out">
          {/* who posted the post or the user */}
          <div className="header__part px-2 py-2  flex justify-center items-center">
            <div className="flex-1 px-1 ">
              <Link
                className="flex justify-start items-center"
                to={`/${User.userName}/profile`}
              >
                <Avatar src={PF + User.profilePicture} />
                <div className="flex flex-col justify-start items-start">
                  <p className="text-gray-700 capitalize  pl-2">
                    {User.userName}
                  </p>
                  <span className="text-md text-gray-700 pl-2">
                    {format(Post.createdAt)}
                  </span>
                </div>
              </Link>
            </div>
            {!DeletePost ? (
              <MoreHorizOutlinedIcon
                onClick={() => setDeletePost(true)}
                className="h-10 cursor-pointer"
              />
            ) : (
              <CancelIcon
                className="h-10 cursor-pointer"
                onClick={() => setDeletePost(false)}
              />
            )}
          </div>
          {DeletePost && (
            <div className="h-auto ml-auto max-w-[13rem] cursor-pointer relative top-0 right-2 z-50 opacity-100 flex items-center justify-end bg-transparent">
              <div
                onClick={() => deletePost(Post._id)}
                className="pb-2 w-full flex justify-around items-center hover:text-red-400 transition-all duration-200 ease-out"
              >
                <DeleteForeverTwoToneIcon className="scale-150" />
                <h1 className="text-2xl font-normal">Delete Post</h1>
              </div>
            </div>
          )}
          {/* the post image */}
          <img
            src={PF + Post.image}
            onClick={() => likeAndUnlike(Post._id)}
            className="object-contain w-full cursor-pointer"
            alt="feed__post"
          />
          <div className="w-full description text-lg p-1 cursor-not-allowed">
            {Post.dec}
          </div>
          {/* buttons */}
          <div className="button__div mt-3 flex justify-between px-3 items-center">
            <div className="flex justify-center items-center space-x-3">
              {islike ? (
                <FavoriteOutlinedIcon
                  onClick={() => likeAndUnlike(Post._id)}
                  className="cursor-pointer text-red-500"
                />
              ) : (
                <FavoriteOutlinedIcon
                  onClick={() => likeAndUnlike(Post._id)}
                  className="cursor-pointer"
                />
              )}
              {showInt ? (
                <ChatBubbleOutlineRoundedIcon
                  onClick={() => setShowInt(false)}
                  className="cursor-pointer scale-125 transition-all duration-300 ease-in-out"
                />
              ) : (
                <ChatBubbleOutlineRoundedIcon
                  onClick={() => setShowInt(true)}
                  className="cursor-pointer"
                />
              )}

              <SendIcon className="cursor-pointer -rotate-12" />
            </div>
            <BookmarkBorderIcon className="cursor-pointer" />
          </div>
          {/* like's */}
          {Post.likes ? (
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
                    <FavoriteOutlinedIcon className="text-red-500 scale-90" />{" "}
                    it
                  </span>
                </>
              )}
            </>
          ) : (
            <></>
          )}

          {/* comment's on post */}
          {Post.comments.length === 0 ? (
            <></>
          ) : (
            <div className="overflow-y-scroll h-20 scrollbar-thin  scrollbar-thumb-black scroll-smooth rounded-lg bg-white p-4">
              {Post.comments.map((curr, i) => (
                <div
                  key={i}
                  className="flex truncate justify-between  items-center"
                >
                  <div className="flex justify-center items-center">
                    <div>
                      <img
                        className="object-cover h-8 rounded-full"
                        // src={PF + User.profilePicture}
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

          {/* input section */}
          {showInt && (
            <form className="flex p-5 items-center transition-all duration-200 ease-out">
              <SentimentSatisfiedAltOutlinedIcon className="h-7" />
              <input
                type="text"
                ref={coment}
                className="flex-1 focus:ring-0 outline-none border-none"
                placeholder="Add a comment..."
              />
              <button
                type="button"
                onClick={() => sendComment(Post._id)}
                className="font-semibold text-blue-500 text-lg"
              >
                Post
              </button>
            </form>
          )}
        </div>
      )}
    </>
  );
};
