// Module dependencies
import { useEffect, useReducer } from 'react';
import type { AppProps } from 'next/app';
import { AppContext, initialState, reducer } from '../state/reducers';
import actionDispatcher from '../state/action-dipatchers';

// Styles
import '../styles/index.scss'

// UI Components
import { Layout, Alert, Spin } from 'antd';
import CustomHeader from '../components/custom-header';

// Assets
import { wording } from '../utils/constants';

const { Content } = Layout;


const MyApp = ({ Component, pageProps }: AppProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const actions = actionDispatcher(state, dispatch);

  const { error, errorMsg, loading } = state;
  const { WEB3_ERROR } = wording;

  /**
   * Check if the site is already connected on metamask and
   * update the global state. 
   */
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
