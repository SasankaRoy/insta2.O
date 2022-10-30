import { LogIn } from "./LogIn";
import { SignIn } from "./SignIn";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./Home";
import { UserProfile } from "./UserProfile";
import { EditProfile } from "./EditProfile";
import {Toaster} from 'react-hot-toast';
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { Profiles } from "./components/Profiles";
import { Messages } from "./components/Messages";
import { Chat } from "./components/Chat";
import { Followers } from "./components/Followers";

export const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/auth/login" element={<LogIn />} />
          <Route path="/auth/signin" element={<SignIn />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path='/profile/messages' element={<Messages />} />
          <Route path='/profile/messages/:conversationId' element={<Chat />} />
          <Route path="/editprofile" element={<EditProfile />} />
          <Route path="/:username/profile" element={<Profiles />} />
          <Route path="/followers" element={<Followers />} />
        </Routes>
        <Toaster />
        {/* <ToastContainer /> */}
      </Router>
    </>
  );
};

//
