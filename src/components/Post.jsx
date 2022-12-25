import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { Feed } from "./Feed";
import { MiniProfile } from "./MiniProfile";
import { Stories } from "./Stories";
import { Suggestions } from "./Suggestions";

export const Post = () => {
  const [post, setPost] = useState([]);
  // const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const fetchPost = async () => {
      const data = await axios.get(
        `https://instagramserver-2-0.onrender.com/api/post/${user._id}/timeline`
      );
      let res = await data.data;
      setPost(
        res.sort((post1, post2) => {
          return new Date(post2.createdAt) - new Date(post1.createdAt);
        })
      );
    };
    fetchPost();
  }, [user._id]);

  return (
    <>
      <main
        className="grid grid-cols-1 md:grid-cols-2 
      md:max-w-3xl lg:grid-cols-3 lg:max-w-6xl mx-auto h-[90%]  overflow-y-scroll"
      >
        <section className="col-span-2 overflow-y-auto h-screen">
          <Stories />
          {post.map((p, id) => (
            <Feed key={id} Post={p} />
          ))}
          {!post.length > 0 && (
            <div className="Nopost__div w-full  h-full">
              <h1 className="text__div w-full h-full flex items-center justify-center p-10 text-center text-6xl">
                Make friends to see post or post some pictures !!
              </h1>
            </div>
          )}
        </section>
        <section className="hidden xl:inline-grid  md:col-span-1 ">
          <div className="fixed top-[11rem]">
            <MiniProfile />
          </div>
          {/* suggestions */}
          <div className="fixed top-[14rem]">
            <Suggestions />
          </div>
        </section>
      </main>
    </>
  );
};
