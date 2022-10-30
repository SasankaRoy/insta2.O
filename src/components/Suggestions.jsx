import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

export const Suggestions = () => {
  const [friends, setFriends] = useState([]);
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  useEffect(() => {
    const getFriends = async (req, res) => {
      let friends = await axios.get(`/user/friend/${user._id}/following`);
      setFriends(friends.data);
    };
    getFriends();
  }, [user?._id]);

  return (
    <>
      {friends && (
        <>
          {friends.map((cur, id) => (
            <div key={id} className="mt-2 ml-6 p-1 ">
             
              <hr className="bg-black" />

              <div
                className="flex items-center
                cursor-pointer  rounded-md
                justify-between mt-4"
              >
                <Link
                  to={`/${cur.userName}/profile`}
                  className="flex justify-center items-center"
                >
                  <img
                    src={PF + cur.profilePicture}
                    // src="https://links.papareact.com/jjm"
                    alt="users"
                    className="h-14 w-14 border
                  border-gray-400 p-[1.5px]
                  rounded-full object-cover "
                  />

                  <div className="flex-1 ml-4">
                    <h2 className="text-lg font-bold text-gray-700">
                      {cur.userName}
                    </h2>
                    <h3 className="text-sm truncate text-gray-500">
                      {cur.education}
                    </h3>
                  </div>
                </Link>

               
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
};
