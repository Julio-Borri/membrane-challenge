// Module dependencies
import { createContext, Dispatch } from 'react';
import { AppState, NetworkSates } from '../interfaces';
import { Actions } from '../actions/index';
import { ActionTypes } from '../action-types/index';


const initialState: AppState = {
  // NetworkState
  web3: null,
  accounts: null,
  contract: null,
  currentChain: '',
  networkState: NetworkSates.UNCONNECTED,
  quizTokenBalance: '0',
  availableTrivias: [],
  activeTrivia: {
    title: '',
    image: '',
    questions: [],
  },
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
  const {
    SET_CURRENT_CHAIN,
    SET_CONTRACT_DATA,
    SET_QUIZ_TOKEN_BALANCE,
    SET_AVAILABLE_TRIVIAS
  } = ActionTypes

  switch (action.type) {
    case SET_CURRENT_CHAIN:
      return {
        ...state,
        currentChain: action.payload,
      };

    case SET_CONTRACT_DATA:
      return {
        ...state,
        web3: action.payload.web3,
        accounts: action.payload.accounts,
        contract: action.payload.contract,
        currentChain: action.payload.currentChain,
        networkState: NetworkSates.CONNECTED,
      };

    case SET_QUIZ_TOKEN_BALANCE:
      return {
        ...state,
        quizTokenBalance: action.payload,
      };

    case SET_AVAILABLE_TRIVIAS:
      return {
        ...state,
        availableTrivias: action.payload,
      };

    default:
      return state;
  }
};

export { AppContext, initialState, reducer };
