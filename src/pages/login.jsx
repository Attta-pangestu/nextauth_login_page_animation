import React from "react";
import Head from "next/head";
import Layout from "@/layout/layout";

const Login = () => {
  return (
    <Layout>
      <Head>
        <title>Login</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="font-bold text-3xl text-black">Login</div>
    </Layout>
  );
};

export default Login;
