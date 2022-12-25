import { Fragment, useContext, useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import HomeIcon from "@mui/icons-material/Home";
import CancelIcon from "@mui/icons-material/Cancel";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import modelState from "../AtomModel/Atom";
import { SelectPost } from "./SelectPost";
import axios from "axios";
import { SearchFriend } from "./SearchFriend";
import { AuthContext } from "../Context/AuthContext";

export const Header = () => {
  const [Open, setOpen] = useRecoilState(modelState);
  const [Toggle, setToggle] = useState(false);
  const [friend, setFriend] = useState("");
  const [searchFriend, setSearchFriend] = useState("");
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleInt = async (event) => {
    setSearchFriend(event.target.value);
    let findFriend = await axios.get(
      `https://instagramserver-2-0.onrender.com/api/user/${event.target.value}/user`
    );
    setFriend(findFriend.data.friends);
  };

  const logOut = async () => {
    let res = await axios.get(
      "https://instagramserver-2-0.onrender.com/api/auth/logout"
    );
    console.log(res.data);
    if (res.status === 200) {
      navigate("https://instagramserver-2-0.onrender.com/api/auth/login");
    }
  };

  return (
    <>
      <head>
        <title>Instagram 2.O</title>
      </head>
      <div className="sticky top-0 opacity-100 z-50 backdrop:blur-4">
        <div className="header__div pt-1 px-2 md:px-0 w-screen shadow-md  border-b-black  flex justify-evenly items-center">
          <Link to="/">
            {" "}
            <div className="logo__div">
              <img
                src="https://links.papareact.com/ocw"
                alt="logo__intextFrom"
                className="hidden md:inline-block w-44  h-auto object-contain object-center"
              />
              <img
                src="https://links.papareact.com/jjm"
                alt="logo__inlogoFrom"
                className=" md:hidden w-10 h-auto object-cover cursor-pointer"
              />
            </div>
          </Link>

          <div className="max-w-xs">
            <div className="mt-2 relative p-3  rounded-md">
              <div className="absolute inset-y-0 pl-3  flex items-center pointer-events-none">
                <SearchOutlinedIcon className="h-5 w-5  text-gray-500 " />
              </div>

              <div>
                <input
                  type="text"
                  className="bg-gray-80 w-full block pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-black focus:border-black"
                  placeholder="Search"
                  onChange={handleInt}
                  value={searchFriend}
                />
              </div>
            </div>
          </div>

          <div>
            <div className="md:hidden justify-center items-center">
              <MenuOutlinedIcon
                onClick={() => {
                  setToggle(true);
                }}
                className="w-10 h-10 cursor-pointer"
              />
            </div>
            <div className="icons__div hidden md:flex justify-center items-center space-x-5">
              <Link to={`/`}>
                <div className="hover:scale-125 transition-all duration-200 ease-out">
                  <HomeIcon className="w-10 h-10 cursor-pointer scale-110" />
                </div>
              </Link>
              <div className=" cursor-pointer hover:scale-125 transition-all duration-200 ease-out relative">
                <Link to="/profile/messages">
                  {" "}
                  <SendOutlinedIcon className="w-10 h-10  scale-105 -rotate-12 " />
                  <div className="bg-red-500 h-5 w-5 flex justify-content items-center  text-lg -right-1 text-white rounded-full absolute -top-1 pl-1 pb-1 animate-pulse transition-all duration-200 ease-out">
                    3
                  </div>
                </Link>
              </div>
              <div className="hover:scale-125 transition-all duration-200 ease-out">
                <AddCircleOutlineOutlinedIcon
                  onClick={() => setOpen(true)}
                  className="w-10 h-10 cursor-pointer scale-105 "
                />
              </div>
              <div className="hover:scale-125 transition-all duration-200 ease-out">
                <PeopleAltOutlinedIcon className="w-10 h-10 cursor-pointer scale-105 " />
              </div>
              <div className="hover:scale-125 transition-all duration-200 ease-out">
                <FavoriteOutlinedIcon className="w-10 h-10 cursor-pointer scale-105 hover:text-red-500 transition-all duration-400 ease-in-out" />
                <div className="h-[5px] w-[5px] bg-red-500 relative left-[9.5px] rounded-full" />
              </div>

              <Link to="/profile/">
                <img
                  src={PF + user.profilePicture}
                  // src="https://links.papareact.com/jjm"
                  alt="userProfilePic"
                  className="w-12 h-12 object-cover object-center cursor-pointer rounded-full hover:scale-125 transition-all duration-200 ease-in-out"
                />
              </Link>
            </div>
          </div>

          {Toggle && (
            <>
              <div className="bg-transparent opacity-100 z-10 backdrop-blur-xl overflow-hidden shadow-md md:hidden absolute h-screen w-[45%] top-0 right-0 transition-all duration-200 ease-in-out">
                <div className="fixed top-7 right-3">
                  <CancelIcon
                    onClick={() => setToggle(false)}
                    className="w-10 h-10 shadow-md cursor-pointer rounded-full hover:scale-125 transition-all duration-200 ease-in-out"
                  />
                </div>

                <div className="icon__div flex flex-col space-y-5 fixed top-24 left-10">
                  <Link to="/">
                    <div className="hover:scale-125 transition-all duration-200 ease-out">
                      <HomeIcon
                        onClick={() => setToggle(false)}
                        className="w-10 h-10 cursor-pointer scale-105 "
                      />
                    </div>
                  </Link>
                  <div className="hover:scale-125 transition-all duration-200 ease-out">
                    <Link to="/profile/messages">
                      <SendOutlinedIcon
                        onClick={() => setToggle(false)}
                        className="w-10 h-10 cursor-pointer scale-105"
                      />
                    </Link>
                  </div>
                  <div className="hover:scale-125 transition-all duration-200 ease-out">
                    <AddCircleOutlineOutlinedIcon
                      onClick={() => {
                        setOpen(true);
                        setToggle(false);
                      }}
                      className="w-10 h-10 cursor-pointer scale-105"
                    />
                  </div>
                  <div className="hover:scale-125 transition-all duration-200 ease-out">
                    <PeopleAltOutlinedIcon
                      onClick={() => setToggle(false)}
                      className="w-10 h-10 cursor-pointer scale-105"
                    />
                  </div>
                  <div className="hover:scale-125 transition-all duration-200 ease-out">
                    <FavoriteOutlinedIcon
                      onClick={() => setToggle(false)}
                      className="w-10 h-10 cursor-pointer scale-105"
                    />
                  </div>
                  <Link to="/profile/">
                    <img
                      src={PF + user.profilePicture}
                      // src="https://links.papareact.com/jjm"
                      alt="userProfilePic"
                      onClick={() => setToggle(false)}
                      className="w-12 h-12 object-cover object-center cursor-pointer rounded-full hover:scale-125 transition-all duration-200 ease-in-out"
                    />
                  </Link>
                </div>
                <div
                  onClick={logOut}
                  className="fixed my-auto cursor-pointer px-2 py-1 bottom-0 flex justify-center items-center  border h-10 w-full "
                >
                  <LogoutOutlinedIcon className="text-blue-500" />
                  <button className="w-full  text-xl capitalize">
                    Log Out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {Open && (
        <>
          <SelectPost Open={Open} setOpen={setOpen} />
        </>
      )}

      {friend && (
        <SearchFriend
          className="transition-all delay-100 duration-500 ease-in"
          Data={friend}
          setFriend={setFriend}
          setSearchFriend={setSearchFriend}
          searchFriend={searchFriend}
        />
      )}
    </>
  );
};
