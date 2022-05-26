// Module dependencies
import { useContext } from 'react';
import { AppContext } from '../../../state/reducers';

// UI Components
import { Form, Typography } from 'antd';
import SurveyQuestion from './survey-question';
import useForm from '../../../hooks/useForm';
import SurveyPreview from './survey-preview';

// Assets
import { TriviaStates } from '../../../state/interfaces';


const { Title } = Typography;

const SurveyForm: React.FC = () => {
  const { state } = useContext(AppContext);

  const { activeTrivia, triviaState } = state;
  const { title, questions } = activeTrivia;

  const { currentQuestion, handleRadioChange, handleSubmitSurvey } = useForm();
  
  return (
    <div>
      {triviaState === TriviaStates.ONGOING && (
        <>
          <Title level={3}>{title}</Title>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            layout="vertical"
          >
            {questions.map((question) => ((questions[currentQuestion].text === question.text) &&
              (<div key={question.text}>
                <SurveyQuestion question={question} handleRadioChange={handleRadioChange} />
              </div>)
            ))}
          </Form>
        </>
      )}

      {triviaState === TriviaStates.TOSUBMIT && (
        <SurveyPreview handleSubmitSurvey={handleSubmitSurvey} />
      )}
    </div>
  );
}

export default SurveyForm;
