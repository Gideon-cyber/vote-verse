"use client";

import classNames from "classnames";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import React, { useState, useMemo, useEffect } from "react";
import {
  ArticleIcon,
  CollapsIcon,
  HomeIcon,
  LogoIcon,
  LogoutIcon,
  UsersIcon,
  VideosIcon,
  PersonIcon,
} from "../icons";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/userSlice";

interface menuItemType {
  id: number;
  label: string;
  link: string;
  icon: any;
}

const Sidebar = () => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  let menuItems: menuItemType[] = [
    //   { id: 1, label: "Home", icon: HomeIcon, link: "/" },
    {
      id: 1,
      label: `${user?.role === "voter" ? "Vote" : "Candidates"}`,
      icon: ArticleIcon,
      link: "/dashboard",
    },

    //   { id: 4, label: "Manage Tutorials", icon: VideosIcon, link: "/tutorials" },
  ];

  //   useEffect(() => {
  if (user?.role === "admin") {
    menuItems = [
      ...menuItems,
      {
        id: 2,
        label: "Add Voters/Candidate",
        icon: PersonIcon,
        link: "/dashboard/add",
      },
      {
        id: 3,
        label: "Admin",
        icon: UsersIcon,
        link: "/dashboard/admin",
      },
    ];
  }
  //   }, []);
  const [toggleCollapse, setToggleCollapse] = useState(true);
  const [isCollapsible, setIsCollapsible] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const activeMenu: menuItemType | undefined = useMemo(
    () => menuItems.find((menu) => menu.link === pathname),
    [pathname]
  );

  const wrapperClasses = classNames(
    "h-screen px-4 pt-8 pb-4 bg-white shadow-ld border-r-2  flex justify-between flex-col",
    {
      ["w-80 absolute left-0 top-0 md:relative"]: !toggleCollapse,
      ["w-20"]: toggleCollapse,
    }
  );

  const collapseIconClasses = classNames(
    "p-4 rounded bg-off-white absolute right-0",
    {
      "rotate-180": toggleCollapse,
    }
  );

  const getNavItemClasses = (menu: any) => {
    return classNames(
      "flex items-center cursor-pointer hover:bg-grey-light rounded w-full overflow-hidden whitespace-nowrap",
      {
        ["bg-blue-secondary text-white font-bold gap-4"]:
          activeMenu?.id === menu.id,
      }
    );
  };

  const onMouseOver = () => {
    setIsCollapsible(!isCollapsible);
  };

  const handleSidebarToggle = () => {
    setToggleCollapse(!toggleCollapse);
  };

  const handleLogout = () => {
    dispatch(logout());
    if (user?.role === "voter") {
      router.push("/login?id=bic");
    } else {
      router.push("/login");
    }
    // dispatch(logout());
  };

  return (
    <div
      className={wrapperClasses}
      onMouseEnter={onMouseOver}
      onMouseLeave={onMouseOver}
      style={{
        transition: "width 300ms cubic-bezier(0.2, 0, 0, 1) 0s",
        boxShadow: "rgb(0 0 0 / 30%) 0px 0px 10px",
      }}
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-between relative">
          <div className="flex items-center pl-1 gap-4">
            {/* <LogoIcon /> */}
            <span
              className={classNames("mt-2 text-lg font-medium text-text", {
                hidden: toggleCollapse,
              })}
            >
              Vote-verse
            </span>
          </div>
          {/* {isCollapsible && ( */}
          <button className={collapseIconClasses} onClick={handleSidebarToggle}>
            <CollapsIcon />
          </button>
          {/* )} */}
        </div>

        <div className="flex flex-col items-start mt-24">
          {menuItems.map(({ icon: Icon, ...menu }) => {
            const classes = getNavItemClasses(menu);
            return (
              <div key={menu?.id} className={classes}>
                <Link href={menu.link}>
                  <div className="flex py-4 px-3 items-center w-full h-full gap-4">
                    <div>
                      {" "}
                      <Icon
                        width={26}
                        height={26}
                        // fill={`${menu.id === activeMenu?.id ? "#fff" : ""}`}
                      />{" "}
                    </div>
                    {!toggleCollapse && (
                      <span
                        className={classNames(
                          "text-md font-medium text-text-light"
                        )}
                      >
                        {menu.label}
                      </span>
                    )}
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      <div
        className={`${getNavItemClasses({})} px-3 py-4`}
        onClick={() => handleLogout()}
      >
        <div style={{ width: "2.5rem" }}>
          <LogoutIcon />{" "}
        </div>
        {!toggleCollapse && (
          <span className={classNames("text-md font-medium text-text-light")}>
            Logout
          </span>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
