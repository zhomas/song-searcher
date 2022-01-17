import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import styles from "../styles/page.module.css";
import { Search } from "../features/search";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>iTunes Search</title>
        <meta name="description" content="iTunes Search" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className={styles.pageHeading}>iTunes Search</h1>
      <Search />
    </>
  );
};

export default Home;
