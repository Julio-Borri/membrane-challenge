// Module dependencies
import { useContext } from 'react';
import { AppContext } from '../../state/reducers';
import actionDispatcher from '../../state/action-dipatchers';

// UI Components
import { Button, Card } from 'antd';

// Assets
import { wording } from '../../utils/constants';

const { Meta } = Card;


interface SurveyCardProps {
  id: number;
  title: string;
  imageUrl: string;
}

const SurveyCard: React.FC<SurveyCardProps> = ({
  id,
  title,
  imageUrl
}) => {
  const { state, dispatch } = useContext(AppContext);
  const actions = actionDispatcher(state, dispatch);

  const { START_SURVEY } = wording;

  return (
    <Card
      cover={<img alt={title} src={imageUrl} />}
    >
      <Meta
        title={title}
        description={(
          <Button
            block
            onClick={() => actions.initializeTrivia(id)}
          >
            {START_SURVEY}
          </Button>
        )}
      />
    </Card>
  );
};

export default SurveyCard;
