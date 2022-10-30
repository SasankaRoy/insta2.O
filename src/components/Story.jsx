import * as faker from "@faker-js/faker";
import { useEffect, useState } from "react";
export const Story = () => {
  const [fakeUser, setFakeUser] = useState([typeof window === "undefined"]);
  useEffect(() => {
    const fakeUsers = [...Array(20)].map((cur, id) => ({
      Name: faker.faker.name.firstName(),
      img: faker.faker.image.avatar(),
      id,
    }));
    setFakeUser(fakeUsers);
  }, []);

  return (
    <>
      {fakeUser.map((curr, id) => (
        <main className="h-28 " key={id}>
          <img
            src={curr.img}
            className="rounded-full w-20 h-20
          border-red-500 border-2 p-[1.5px] object-contain
            cursor-pointer  hover:scale-125 transition transform
            duration-150 ease-in"
            alt="stoy"
          />
          <p
            className=" w-20 h-20 text-center
       text-md truncate"
          >
            {curr.Name}
          </p>
        </main>
      ))}
    </>
  );
};
