// Module dependencies
import { useContext } from 'react';
import { AppContext } from '../../state/reducers';
import actionDispatcher from '../../state/action-dipatchers';

// UI Components
import { Typography } from 'antd';

// Assets
import { NetworkStates, TriviaStates } from '../../state/interfaces';
import { wording, ropstenChainId } from '../../utils/constants';
import SurveyList from './survey-list';
import SurveyForm from './survey-form';

const { Text, Title } = Typography;


const SurveyManager: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const { networkState, currentChain, triviaState } = state;

  const { CONNECTED } = NetworkStates;
  const { UNSTARTED, ONGOING } = TriviaStates;
  const { AVAILABLE_SURVEYS, COMPLETE_CONNECTION } = wording;

  const fullyConnected = networkState === CONNECTED && currentChain === ropstenChainId;
  const showSurveyList = networkState === CONNECTED && currentChain === ropstenChainId && triviaState === UNSTARTED;
  
  return (
    <div className="trivia-container">
      {showSurveyList && (
        <>
          <Title level={3}>{AVAILABLE_SURVEYS}</Title>
          <SurveyList />
        </>
      )}

      {!fullyConnected && <Text>{COMPLETE_CONNECTION}</Text>}

      {triviaState === ONGOING && (
        <SurveyForm />
      )}
    </div>
  );
};

export default SurveyManager;