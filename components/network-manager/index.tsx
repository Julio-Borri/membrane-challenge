// Module dependencies
import { useContext } from 'react';
import { AppContext } from '../../state/reducers';
import actionDispatcher from '../../state/action-dipatchers';

// UI Components
import { Button } from 'antd';
import { Typography, Space } from 'antd';
import { Row, Col, Divider } from 'antd';

// Assets
import { NetworkSates } from '../../state/interfaces';
import { wording, ropstenChainId } from '../../utils/constants';


const { Text, Link } = Typography;


const NetworkManager: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const { networkState, currentChain } = state;

  const { CONNECTED, UNCONNECTED } = NetworkSates;
  const {
    CONNECT_TO_METAMASK,
    CONNECT_METAMASK_LABEL,
    CONNECT_TO_ROPSTEN,
    CONNECT_ROPSTEN_LABEL,
  } = wording;

  const actions = actionDispatcher(dispatch);

  console.log(state);
  
  return (
    <>
      {networkState === UNCONNECTED && (
        <Row align="middle">
          <Col xs={24} sm={12}>
            <Text>{CONNECT_TO_METAMASK}</Text>
          </Col>
          <Col xs={24} sm={12}>
            <Button
              type="primary"
              onClick={actions.handleConnect}
            >
              {CONNECT_METAMASK_LABEL}
            </Button>
          </Col>
        </Row>
      )}

      {(networkState === CONNECTED && currentChain !== ropstenChainId) && (
        <Row align="middle">
          <Col xs={24} sm={12}>
            <Text>{CONNECT_TO_ROPSTEN}</Text>
          </Col>
          <Col xs={24} sm={12}>
            <Button
              type="primary"
              onClick={() => actions.handleChangeNetwork(ropstenChainId)}
            >
              {CONNECT_ROPSTEN_LABEL}
            </Button>
          </Col>
        </Row>
      )}
    </>
  );
};

export default NetworkManager;