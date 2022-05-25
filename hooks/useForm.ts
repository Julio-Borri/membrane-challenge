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


  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [timeAlive, setTimeAlive] = useState<number>(0);
  const [formValues, setFormValues] = useState<{[key: string]: number}>();


  useEffect(() => {
    const timer = setInterval(() => {
      setTimeAlive(oldTime => oldTime + 1)
    }, 1000);
    
    if (timeAlive === questions[currentQuestion]?.lifetimeSeconds) {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prevQuestion => prevQuestion + 1);
        setTimeAlive(0);
      } else {
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
    // try {
    //   await contract.methods
    //     .submit(surveyId, Object.values(formValues))
    //     .send({ from: accounts[0] });
    // } catch (error) {
    //   alert(`Failed submitting the quiz.`);
    //   console.error(error);
    // }
    actions.submitSurvey(formValues);
  };
  
  return {
    currentQuestion,
    handleRadioChange,
    handleSubmitSurvey,
  };
};

export default useForm;
