// Module dependencies
import { createContext, Dispatch } from 'react';
import { AppState, NetworkStates, TriviaStates } from '../interfaces';
import { Actions } from '../actions/index';
import { ActionTypes } from '../action-types/index';


const initialState: AppState = {
  // Network States
  web3: null,
  accounts: null,
  contract: null,
  currentChain: '',
  networkState: NetworkStates.UNCONNECTED,

  // Trivia States
  quizTokenBalance: '0',
  availableTrivias: [],
  activeTrivia: {
    id: 0,
    title: '',
    image: '',
    questions: [],
  },
  triviaState: TriviaStates.UNSTARTED,
  answers: {},

  // Global States
  loading: false,
  error: false,
  errorMsg: '',
};

const AppContext = createContext<{
  state: AppState;
  dispatch: Dispatch<Actions>;
}>({
  state: initialState,
  dispatch: () => null
});

const reducer = (
  state: AppState,
  action: Actions
): AppState => {


  switch (action.type) {
    case ActionTypes.SET_CURRENT_CHAIN:
      return {
        ...state,
        currentChain: action.payload,
      };

    case ActionTypes.SET_CONTRACT_DATA:
      return {
        ...state,
        web3: action.payload.web3,
        accounts: action.payload.accounts,
        contract: action.payload.contract,
        currentChain: action.payload.currentChain,
        networkState: NetworkStates.CONNECTED,
      };

    case ActionTypes.SET_QUIZ_TOKEN_BALANCE:
      return {
        ...state,
        quizTokenBalance: action.payload,
      };

    case ActionTypes.SET_AVAILABLE_TRIVIAS:
      return {
        ...state,
        availableTrivias: action.payload,
      };

    case ActionTypes.INITIALIZE_TRIVIA:
      return {
        ...state,
        triviaState: TriviaStates.ONGOING,
        activeTrivia: action.payload,
      };

    case ActionTypes.SET_TRIVIA_ANSWERS:
      return {
        ...state,
        triviaState: TriviaStates.TOSUBMIT,
        answers: action.payload,
      };

    case ActionTypes.SUBMIT_TRIVIA:
      return {
        ...state,
        loading: true,
      };

    case ActionTypes.FINISH_SUBMIT:
      return {
        ...state,
        loading: false,
        triviaState: TriviaStates.UNSTARTED,
        answers: {},
        activeTrivia: {
          id: 0,
          title: '',
          image: '',
          questions: [],
        },
      };

    case ActionTypes.SET_ERROR:
      return {
        ...state,
        error: true,
        errorMsg: action.payload,
      };

    case ActionTypes.DISMISS_ERROR:
      return {
        ...state,
        error: false,
        errorMsg: '',
      };

    default:
      return state;
  }
};

export { AppContext, initialState, reducer };
