// Module dependencies
import { useContext } from 'react';
import { AppContext } from '../../state/reducers';

// UI Components
import { Form, Typography } from 'antd';
import SurveyQuestion from './survey-question';

const { Title } = Typography;

const SurveyForm: React.FC = () => {
  const { state } = useContext(AppContext);

  const { activeTrivia } = state;
  const { title, questions } = activeTrivia;

  return (
    <div>
      <Title level={3}>{title}</Title>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        layout="vertical"
      >
        {questions.map((question) => (
          <SurveyQuestion {...question} />
        ))}
      </Form>
    </div>
  );
};


export default SurveyForm;
