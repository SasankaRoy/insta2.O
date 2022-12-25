import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Friends } from "./Friends";
import { Header } from "./Header";
import { MiniProfile } from "./MiniProfile";
import { Suggestions } from "./Suggestions";

export const Messages = () => {
  const { user } = useContext(AuthContext);

  const [conversation, setConversation] = useState([]);
  useEffect(() => {
    getAllConversations();
  }, [user._id]);
  const getAllConversations = async () => {
    try {
      let result = await axios.get(`/conversation/${user._id}`);

      setConversation(result.data.conversation);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="h-screen overflow-y-auto overflow-x-hidden">
        <Header />
        <main
          className=" grid grid-cols-1 md:grid-cols-2 
      md:max-w-3xl lg:grid-cols-3 lg:max-w-6xl mx-auto h-[90%]  overflow-y-scroll"
        >
          <section className="messages__div col-span-2 overflow-y-auto h-full rounded-md">
            {conversation.map((cur, id) => (
              <Friends key={id} friend={cur} />
            ))}
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
      </div>
    </>
  );
};
