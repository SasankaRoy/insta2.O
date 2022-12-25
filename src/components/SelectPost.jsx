import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext, useRef, useState } from "react";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";

export const SelectPost = ({ Open, setOpen }) => {
  const [seleFile, setSeleFile] = useState();
  const [File, setFile] = useState();
  const [loading, setloading] = useState(false);
  const filePickerRef = useRef(null);
  const description = useRef("");
  const { user } = useContext(AuthContext);

  const addImagePost = (event) => {
    setFile(event.target.files[0]);
    const fileReader = new FileReader();
    if (event.target.files[0]) {
      fileReader.readAsDataURL(event.target.files[0]);
    }
    fileReader.onload = (reader) => {
      setSeleFile(reader.target.result);
    };
  };
  const upLoadPost = async () => {
    const userPost = {
      userId: user._id,
      dec: description.current.value,
      image: File.name,
    };
    const data = new FormData();
    data.append("file", File);
    try {
      await axios.post(
        "https://instagramserver-2-0.onrender.com/api/upload",
        data
      );
      setloading(true);
    } catch (error) {
      console.log(error);
    }
    try {
      await axios.post(
        "https://instagramserver-2-0.onrender.com/api/post",
        userPost
      );
      setOpen(false);
      setloading(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Transition.Root show={Open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          onClose={() => {
            setOpen(false);
          }}
        >
          <div className="flex items-end justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed bg-opacity-75 inset-0 bg-gray-500 transition-opacity" />
            </Transition.Child>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8503;
            </span>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:scale-95 sm:translate-y-0"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100  translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:scale-95 sm:translate-y-0"
            >
              <div
                className="inline-block  bg-white rounded-lg px-4 pt-5 pb-4
                text-left overflow-hidden shadow-lg transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6"
              >
                <div>
                  {seleFile ? (
                    <>
                      <img
                        src={seleFile}
                        className="w-full object-contain"
                        alt="Post"
                      />
                    </>
                  ) : (
                    <div
                      onClick={() => filePickerRef.current.click()}
                      className="flex mx-auto w-12 h-12
                          items-center justify-center rounded-full
                        bg-red-100 cursor-pointer"
                    >
                      <CameraAltOutlinedIcon
                        className="w-6 h-6 text-red-500"
                        aria-hidden="true"
                      />
                    </div>
                  )}

                  <div>
                    <div className="mt-4 text-center sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-gray-700 text-lg leading-6 font-medium"
                      >
                        Upload a photo
                      </Dialog.Title>

                      <div>
                        <input
                          type="file"
                          ref={filePickerRef}
                          hidden
                          onChange={addImagePost}
                        />
                      </div>

                      <div>
                        <input
                          type="text"
                          placeholder="plz add a caption"
                          ref={description}
                          className="w-full text-center focus:ring-0 border-none"
                          name="post"
                          id=""
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <button
                      disabled={!seleFile}
                      className="w-full inline-flex justify-center border
                     border-transparent rounded-md shadow-sm px-4 py-2 
                     bg-red-600 text-base text-white font-medium
                     hover:bg-red-700 focus:outline-none focus:ring-2
                      focus:ring-offset-2 focus:ring-red-500 sm:text-sm
                       disabled:bg-gray-400 disabled:cursor-not-allowed
                        hover:disabled:bg-gray-300"
                      onClick={upLoadPost}
                    >
                      {loading ? "Uploading..." : "Upload Post"}{" "}
                    </button>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};
