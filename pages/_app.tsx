// Module dependencies
import { useEffect, useReducer } from 'react';
import type { AppProps } from 'next/app';
import { AppContext, initialState, reducer } from '../state/reducers';

// Styles
import '../styles/index.scss'

// Components
import { Layout } from 'antd';
import NetworkManager from '../components/network-manager';
import CustomHeader from '../components/custom-header';
import actionDispatcher from '../state/action-dipatchers';

const { Header, Footer, Sider, Content } = Layout;

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const actions = actionDispatcher(state, dispatch);

  useEffect(() => {
    const checkSiteAlreadyConnected = async (): Promise<void> => {
      const accounts = await window.ethereum
        .request({ method: 'eth_accounts' });

      if (accounts.length > 0)
        actions.handleConnect();
    };

    checkSiteAlreadyConnected();
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <Layout>
        <CustomHeader />
        <Content>
          <Component {...pageProps} />
        </Content>
      </Layout>
    </AppContext.Provider>
  );
};

export default MyApp;
