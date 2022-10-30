import { Story } from "./Story";

export const Stories = () => {
  return (
    <>
      <div
        className="stories__div scrollbar-thin
        scrollbar-thumb-black scroll-smooth
        border-gray-300 border
        rounded-md bg-white
        p-7 mt-1 h-auto
        w-[97%] overflow-x-auto overflow-y-hidden
        mx-auto flex justify-around
        items-center md:space-x-0 space-x-3"
      >
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
      </div>
    </>
  );
};
