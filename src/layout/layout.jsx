import React from "react";
import style from "../styles/Layout.module.css";
const Layout = ({ children }) => {
  return (
    <main className="flex w-full min-h-screen bg-blue-400">
      <div className="m-auto w-3/5  grid lg:grid-cols-2 bg-slate-50  rounded-md">
        <div className={style.imgWrapper}>
          <div className={style.cartoonImg}></div>
          <div className={style.cloud_one}></div>
          <div className={style.cloud_two}></div>
        </div>

        <div className="right flex flex-col justify-evenly ">
          <div className="text-center py-10">{children}</div>
        </div>
      </div>
    </main>
  );
};

export default Layout;
