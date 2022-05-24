// Module dependencies
import { useContext } from 'react';
import { AppContext } from '../../state/reducers';

// UI Components
import { Row, Col } from 'antd';
import SurveyCard from './survey-card';

// Assets
import { SurveyInterface } from '../../state/interfaces';


const SurveyList: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const { availableTrivias } = state;

  return (
    <Row gutter={[16, 16]}>
      {availableTrivias.map(({ title, image, id }: SurveyInterface) => (
        <Col xs={24} sm={8} key={id}>
          <SurveyCard title={title} imageUrl={image} id={id} />
        </Col>
      ))}
    </Row>
  );
};

export default SurveyList;
