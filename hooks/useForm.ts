// Module dependencies
import { useContext, useState, useEffect } from 'react';
import { AppContext } from '../state/reducers';
import actionDispatcher from '../state/action-dipatchers';
import type { RadioChangeEvent } from 'antd';

// Assets
import { wording } from '../utils/constants';
wording

const useForm = () => {
  const { state, dispatch } = useContext(AppContext);

  const actions = actionDispatcher(state, dispatch);

  const { activeTrivia, contract, accounts } = state;
  const { questions, id: surveyId } = activeTrivia;

  const { UNANSWERED } = wording;

  const getFormValuesInitialState = () => {
    let initialValues = {};
    questions.map(({ text }) => {
      initialValues = {
        ...initialValues,
        [text]: UNANSWERED,
      }
    })

    return initialValues;
  };

  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [timeAlive, setTimeAlive] = useState<number>(0);
  const [formValues, setFormValues] = useState(getFormValuesInitialState());


  useEffect(() => {
    const timer = setInterval(() => {
      setTimeAlive(oldTime => oldTime + 1)
    }, 1000);
    
    if (timeAlive === questions[currentQuestion]?.lifetimeSeconds) {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prevQuestion => prevQuestion + 1);
        setTimeAlive(0);
      } else {
        console.log('to submit'); //
        actions.setTriviaAnswers(formValues);
        clearInterval(timer);
      }
    }

    return () => {
      clearInterval(timer);
    };
  }, [timeAlive])
  
  const handleRadioChange = ({ target }: RadioChangeEvent) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const handleSubmitSurvey = async (): Promise<void> => {
    try {
      await contract.methods
        .submit(surveyId, Object.values(formValues))
        .send({ from: accounts[0] });
    } catch (error) {
      alert(`Failed submitting the quiz.`);
      console.error(error);
    }
  };
  
  return {
    currentQuestion,
    handleRadioChange,
    handleSubmitSurvey,
  };
};

export default useForm;
