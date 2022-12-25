import { Avatar } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import { format } from "timeago.js";
import { io } from "socket.io-client";

export const Chat = () => {
  const { user } = useContext(AuthContext);
  const { conversationId } = useParams();
  const [SMS, setSMS] = useState([]);
  const [NewSMS, setNewSMS] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const socket = useRef();
  const scrollRef = useRef();

  const useQuery = () => {
    // getting the query value
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  };

  let query = useQuery();
  useEffect(() => {
    // for the socketio connection
    socket.current = io("http://localhost:8000");
    socket.current.on("sendMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      query.get("friendId") === arrivalMessage.sender &&
      setSMS((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    const getSMS = async () => {
      try {
        const result = await axios.get(`/message/${conversationId}`);
        setSMS(result.data.messages);
      } catch (error) {
        console.log(error);
      }
    };
    getSMS();
  }, [conversationId]);
  let lastSeen = SMS?.slice(-1).map((cur, id) => cur.updatedAt); //for lstseen

  const handleSubmit = async () => {
    //sending the message
    const message = {
      text: NewSMS,
      sender: user._id,
      conversationId,
    };
    console.log(query.get("friendId"));

    socket.current.emit("recvMessage", {
      senderId: user._id,
      receiverId: query.get("friendId"),
      text: NewSMS,
    });
    try {
      let result = await axios.post("/message", message);
      setSMS([...SMS, result.data]);
      setNewSMS("");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    //for the scroll view
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [SMS]);

  useEffect(() => {
    //socketio here for same time sync with both the user interface
    socket.current?.emit("sendUser", user._id);
  }, [user._id]);
  const date = new Date(lastSeen).toLocaleTimeString();
  return (
    <>
      <div className="h-screen overflow-y-auto overflow-x-hidden">
        <main
          className=" grid grid-cols-1 md:grid-cols-2 
          md:max-w-3xl lg:grid-cols-3 lg:max-w-6xl mx-auto
           h-[100%]  overflow-y-scroll overflow-x-hidden rounded py-1 px-1"
        >
          <section className="messages__div col-span-3 overflow-y-auto overflow-x-hidden scroll-smooth h-full rounded-md">
            <div
              className="header h-14 flex items-center
            justify-start space-x-5 px-6 w-screen shadow-md
            rounded-md bg-gray-100"
            >
              <div className="img">
                <Avatar />
              </div>
              <div className="userName ">
                <h1 className="text-2xl font-normal">
                  {query.get("userName")}
                </h1>
                <p className="text-sm font-light">last seen: {date}</p>
              </div>
            </div>
            <div className="sms__div  w-auto h-[85%] py-5 px-1 overflow-x-auto">
              {SMS.map((cur, id) => (
                <>
                  <div
                    ref={scrollRef}
                    key={id}
                    className={
                      cur.sender === user._id
                        ? "right float-right clear-both mt-5"
                        : "left float-left clear-both mt-10"
                    }
                  >
                    <div className="space-x-2 flex justify-center items-center">
                      <div className="img__div">
                        <Avatar />
                      </div>
                      <div
                        className={
                          cur.sender === user._id
                            ? "sms bg-gray-200 text-black rounded-lg py-3 px-5 max-w-md text-lg"
                            : "sms bg-[#f9004d] text-white rounded-lg py-3 px-4 max-w-md text-lg "
                        }
                      >
                        <p>{cur?.text}</p>
                      </div>
                    </div>
                    <span className="mt-1 ml-10 text-sm font-light">
                      {format(cur.createdAt)}
                    </span>
                  </div>
                </>
              ))}
            </div>

            <div className="input__div fixed bottom-2 flex justify-start items-center w-full px-2 pb-1 space-x-1  ">
              <input
                type="text"
                placeholder="type here..."
                className="md:w-[70.7%] rounded-md w-[100%] border-none outline-none focus:border-none focus:outline-none focus:ring-none placeholder:text-gray-600 placeholder:text-lg"
                onChange={(e) => setNewSMS(e.target.value)}
                value={NewSMS}
              />
              <button
                onClick={handleSubmit}
                className=" singInBtn  bg-[#f9004d] text-white font-normal relative py-6 px-6 text-2xl  p-[1.5px] rounded-full shadow-sm shadow-[#f9004d] "
              >
                <SendOutlinedIcon className="scale-150 -rotate-45 absolute bottom-3 right-2 hover:scale-125 transition-transform duration-300 ease-in-out" />
              </button>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};
