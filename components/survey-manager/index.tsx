// Module dependencies
import { useContext } from 'react';
import { AppContext } from '../../state/reducers';

// UI Components
import { Typography } from 'antd';
import SurveyList from './survey-list';
import SurveyForm from './survey-form';

// Assets
import { NetworkStates, TriviaStates } from '../../state/interfaces';
import { wording, ropstenChainId } from '../../utils/constants';

const { Text, Title } = Typography;


const SurveyManager: React.FC = () => {
  const { state } = useContext(AppContext);
  const { networkState, currentChain, triviaState } = state;

  const { AVAILABLE_SURVEYS, COMPLETE_CONNECTION } = wording;

  const fullyConnected = networkState === NetworkStates.CONNECTED
    && currentChain === ropstenChainId;

  const showSurveyList = networkState === NetworkStates.CONNECTED
    && currentChain === ropstenChainId
    && triviaState === TriviaStates.UNSTARTED;
  
  return (
    <div className="survey-container">
      {showSurveyList && (
        <>
          <Title level={3}>{AVAILABLE_SURVEYS}</Title>
          <SurveyList />
        </>
      )}

      {!fullyConnected && <Text>{COMPLETE_CONNECTION}</Text>}

      {triviaState !== TriviaStates.UNSTARTED && (
        <SurveyForm />
      )}
    </div>
  );
};

export default SurveyManager;
