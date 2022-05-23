// Module dependencies
import { useReducer } from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Web3Context, web3InitialState, web3reducer } from '../state/reducers/web3Reducer';

// Components
import NetworkManager from '../components/network-manager';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [web3State, web3dispatch] = useReducer(web3reducer, web3InitialState);

  return (
    <Web3Context.Provider value={{ web3State, web3dispatch }}>
      <NetworkManager />
      <Component {...pageProps} />
    </Web3Context.Provider>
  );
};

export default MyApp;
