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
import { Alert, Spin } from 'antd';
import { wording } from '../utils/constants';


const { Header, Footer, Sider, Content } = Layout;

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const actions = actionDispatcher(state, dispatch);

  const { error, errorMsg, loading } = state;
  const { PAGE_TITLE, PAGE_SUBTITLE, WEB3_ERROR } = wording;


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

        {error && (
          <Alert
            message={WEB3_ERROR}
            description={errorMsg}
            type="error"
            showIcon
            onClose={actions.handleDismissError}
            closable
            banner
          />
        )}

        {loading && (
          <div className="spin-container">
            <Spin size="large" />
          </div>
        )}
      </Layout>
    </AppContext.Provider>
  );
};

export default MyApp;
