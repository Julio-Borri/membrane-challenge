// Module dependencies
import { useContext, useEffect } from 'react';
import { AppContext } from '../../state/reducers';
import actionDispatcher from '../../state/action-dipatchers';

// UI Components
import { Typography, Card, Row, Col } from 'antd';

// Assets
import { NetworkSates, SurveyInterface } from '../../state/interfaces';
import { wording, ropstenChainId } from '../../utils/constants';
import SurveyCard from './survey-card';

const { Text, Title } = Typography;
const { Meta } = Card;


const SurveyManager: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const { availableTrivias, networkState, currentChain } = state;

  const { CONNECTED } = NetworkSates;
  const { AVAILABLE_SURVEYS, COMPLETE_CONNECTION } = wording;

  const surveyCardList = availableTrivias.map(({ title, image }: SurveyInterface) => (
    <SurveyCard title={title} imageUrl={image} key={title} />
  ));

  
  return (
    <div className="trivia-container">
      <Title level={3}>{AVAILABLE_SURVEYS}</Title>

      {(networkState === CONNECTED && currentChain === ropstenChainId) 
        ? surveyCardList
        : <Text>{COMPLETE_CONNECTION}</Text>
      }
    </div>
  );
};

export default SurveyManager;