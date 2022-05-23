// Module dependencies
import type { NextPage } from 'next';

// UI Components
import Head from 'next/head';
import NetworkManager from '../components/network-manager';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Membrane FE Challenge</title>
        <meta name="description" content="Challenge fro membrane project" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NetworkManager />
    </div>
  );
};

export default Home;
