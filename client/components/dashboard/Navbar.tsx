"use client";

import { useAppSelector } from "@/redux/hooks";

const Navbar = () => {
  const { user } = useAppSelector((state) => state.user);
  return (
    <div className="h-[70px] md:h-[80px] w-full shadow-lg flex items-center justify-end">
      <span className="text-[20px] font-semibold text-blue-primary mr-4">
        Welcome {user?.firstName}
      </span>
    </div>
  );
};

export default Navbar;
