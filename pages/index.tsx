import differenceInDays from "date-fns/differenceInDays";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { dbClient } from "../db/client";
import styles from "../styles/Home.module.css";

const Home: NextPage<{
  daysSinceLastFire: number;
}> = ({ daysSinceLastFire }) => {
  const [state, setState] = useState({ daysSinceLastFire, loading: false });
  const onClick = async () => {
    try {
      setState({ daysSinceLastFire, loading: true });
      await fetch("/api/reset", { method: "POST" });
      setState({ daysSinceLastFire: 0, loading: false });
    } catch {
      setState({ daysSinceLastFire, loading: false });
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Fire Tracker</title>
        <link
          rel="icon"
          href="https://www.popeyes.com/assets/plk/favicon.ico"
        />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          {state.daysSinceLastFire} Days Since Last 🔥🔥🔥
        </h1>
        <button onClick={onClick} disabled={state.loading}>
          {state.loading ? "😫😫😫" : "Reset"}
        </button>
      </main>
    </div>
  );
};

export const getServerSideProps = async () => {
  const { data } = await dbClient
    .from("days")
    .select()
    .order("created_at", { ascending: false })
    .limit(1);

  const lastFireDate = data?.[0].created_at ?? 0;
  const daysSinceLastFire = differenceInDays(
    new Date(),
    new Date(lastFireDate)
  );

  return { props: { daysSinceLastFire } };
};

export default Home;
