import React, { useState } from "react";
import style from "../styles/Home.module.css";
import Head from "next/head";
import Link from "next/link";
import { signIn, useSession, signOut, getSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/dist/server/api-utils";

export default function Home({ user }) {
  // const status = "loading";
  // const { data, status } = useSession();

  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {user ? <User user={user} /> : <Guest />}
    </>
  );
}

// Guest Render
function Guest() {
  return (
    <main className={style.main}>
      <h3 className={style.title_page}>Guest Homepage</h3>
      <div className="flex flex-col  items-center justify-center">
        <Link href={"/login"} className={style.link}>
          Sign In
        </Link>
        <Link href={"/register"} className={style.link}>
          Sign Up
        </Link>
      </div>
    </main>
  );
}

function User({ user }) {
  console.log(user.image);
  return (
    <main className={style.main}>
      <h3 className={style.title_page}>Authorize User </h3>

      <div className={style.details_wrapper}>
        <Image
          src={`${user.image}`}
          width={100}
          height={100}
          alt="..."
          className={style.userImage}
        />
        <h3>User Name : {user.name}</h3>
        <h3>User Email : {user.email}</h3>
      </div>

      <div className={style.btnWrapper}>
        <button className={style.signOutBtn} onClick={signOut}>
          Sign Out
        </button>
      </div>

      <div className={style.btnWrapper}>
        <Link href="/profile" className={style.linkProfile}>
          Profile Page
        </Link>
      </div>
    </main>
  );
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  console.log(session);
  if (!session) {
    return {
      props: { user: null },
    };
    //   return {
    //     redirect: {
    //       destination: "/login",
    //       permanent: false,
    //     },
    //   };
  }
  return {
    props: {
      user: session.user,
    },
  };
}
