import { useContext } from "react";

import { Header } from "./components/Header";
import { Post } from "./components/Post";
import { AuthContext } from "./Context/AuthContext";
import { LogIn } from "./LogIn";

export const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      {user ? (
        <div className="homepage__div h-screen overflow-y-auto overflow-x-hidden">
          <Header />
          <Post />
        </div>
      ) : (
        <LogIn />
      )}
    </>
  );
};
