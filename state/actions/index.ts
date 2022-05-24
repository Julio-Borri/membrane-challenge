// Module dependencies
import { ActionTypes } from '../action-types';
import { SurveyInterface, TriviaStates } from '../interfaces';


interface SetCurrentChainAction {
  type: ActionTypes.SET_CURRENT_CHAIN;
  payload: string;
}

interface SetContractDataAction {
  type: ActionTypes.SET_CONTRACT_DATA;
  payload: {
    web3: any;
    accounts: any;
    contract: any;
    currentChain: string;
  };
}

interface SetQuizTokenBalanceAction {
  type: ActionTypes.SET_QUIZ_TOKEN_BALANCE;
  payload: string;
}

interface setAvailableTriviasAction {
  type: ActionTypes.SET_AVAILABLE_TRIVIAS;
  payload: Array<SurveyInterface>;
}

interface initializeTriviaAction {
  type: ActionTypes.INITIALIZE_TRIVIA;
  payload: SurveyInterface;
}

export type Actions =
  | SetCurrentChainAction
  | SetContractDataAction
  | SetQuizTokenBalanceAction
  | setAvailableTriviasAction
  | initializeTriviaAction;
