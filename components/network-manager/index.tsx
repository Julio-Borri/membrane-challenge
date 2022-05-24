// Module dependencies
import { useContext, useEffect } from 'react';
import { AppContext } from '../../state/reducers';
import actionDispatcher from '../../state/action-dipatchers';

// UI Components
import { Card, Row, Col } from 'antd';
import StatusCard from './status-card';

// Assets
import { NetworkSates } from '../../state/interfaces';
import { wording, ropstenChainId } from '../../utils/constants';


const NetworkManager: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const { networkState, currentChain, quizTokenBalance } = state;

  const { CONNECTED } = NetworkSates;
  const {
    ALREADY_CONNECTED,
    CONNECT_METAMASK_LABEL,
    CONNECT_ROPSTEN_LABEL,
    UPDATE_TOKENS_LABEL,
    METAMASK_CARD_TITLE,
    NETWORK_CARD_TITLE,
    TOKEN_CARD_TITLE,
    ROPSTEN_CONNECTED,
    
  } = wording;

  const actions = actionDispatcher(state, dispatch);

  useEffect(() => {
    if (currentChain === ropstenChainId) {
      actions.getQuizTokenBalance();
    }
  }, [networkState, currentChain, quizTokenBalance]);

  console.log(state);
  
  return (
    <div className="manager-container">
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <StatusCard
            cardTitle={METAMASK_CARD_TITLE}
            buttonLabel={CONNECT_METAMASK_LABEL}
            successCondition={networkState === CONNECTED}
            successText={ALREADY_CONNECTED}
            handler={actions.handleConnect}
          />
        </Col>
        <Col xs={24} sm={8}>
          <StatusCard
            cardTitle={NETWORK_CARD_TITLE}
            buttonLabel={CONNECT_ROPSTEN_LABEL}
            successCondition={(networkState === CONNECTED && currentChain === ropstenChainId)}
            successText={ROPSTEN_CONNECTED}
            handler={() => actions.handleChangeNetwork(ropstenChainId)}
            disableButton={networkState !== CONNECTED}
          />
        </Col>
        <Col xs={24} sm={8}>
          <StatusCard
            cardTitle={TOKEN_CARD_TITLE}
            buttonLabel={UPDATE_TOKENS_LABEL}
            successCondition={true}
            successText={`${quizTokenBalance}`}
            handler={actions.getQuizTokenBalance}
          />
        </Col>
      </Row>
    </div>
  );
};

export default NetworkManager;