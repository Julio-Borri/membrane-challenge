// Module dependencies
import { useContext, useState, useEffect } from 'react';
import { AppContext } from '../state/reducers';
import actionDispatcher from '../state/action-dipatchers';
import type { RadioChangeEvent } from 'antd';


/**
 * Custom hook. Handle state changes for the survey form.
 * @returns The current question and the functions required to manage the form state.
 */
const useForm = () => {
  const { state, dispatch } = useContext(AppContext);

  const actions = actionDispatcher(state, dispatch);

  const { activeTrivia } = state;
  const { questions } = activeTrivia;

  // Form States
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [timeAlive, setTimeAlive] = useState<number>(0);
  const [formValues, setFormValues] = useState<{[key: string]: number}>();

  /**
   * Controls the questions transitions. Keeps alive the question
   * during the lifetime and change to the next one. 
   * Once all are completed save answer in context and change to preview state.
   */
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
  
  /**
   * Handle the users selection and update the form state.
   * @param event The DOM event. {target} = Reference to the object onto which the event was dispatched.
   */
  const handleRadioChange = ({ target }: RadioChangeEvent) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  /**
   * Handles when the user submits the survey form.
   */
  const handleSubmitSurvey = async (): Promise<void> => {
    actions.submitSurvey(formValues);
  };
  
  return {
    currentQuestion,
    handleRadioChange,
    handleSubmitSurvey,
  };
};

export default useForm;
