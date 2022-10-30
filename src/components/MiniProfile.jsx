import axios from "axios";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

export const MiniProfile = () => {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const navigate = useNavigate();

  const logOut = async () => {
    let res = await axios.get("/auth/logout");
    console.log(res.data);
    if(res.status === 200){
      navigate("/auth/login");
    }
  };
  return (
    <div
      className="flex items-center
        justify-between -mt-14 ml-4"
    >
      <Link to="/profile/" className="cursor-pointer">
        <img
          src={PF + user.profilePicture}
          // src="https://links.papareact.com/jjm" //  faker.faker.name.findName()
          alt="userlogo"
          className="rounded-full
           border p-[2px]  h-16 w-16 object-cover"
        />
      </Link>
      <Link to="/profile/" className="cursor-pointer">
        <div className="truncate  flex-1 mx-6">
          <h2 className="font-semibold text-lg">{user?.userName}</h2>
          <h3
            className="font-normal
           text-sm  text-gray-400"
          >
          {user?.education}
           
          </h3>
        </div>
      </Link>
      <button
        className="font-semibold
         text-md text-blue-300"
        onClick={logOut}
      >
        Log Out
      </button>
    </div>
  );
};
