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

interface InitializeTriviaAction {
  type: ActionTypes.INITIALIZE_TRIVIA;
  payload: SurveyInterface;
}

interface SetTriviaAnwersAction {
  type: ActionTypes.SET_TRIVIA_ANSWERS;
  payload: { [key: string]: string };
}

interface SubmitTriviaAction {
  type: ActionTypes.SUBMIT_TRIVIA;
}

export type Actions =
  | SetCurrentChainAction
  | SetContractDataAction
  | SetQuizTokenBalanceAction
  | setAvailableTriviasAction
  | InitializeTriviaAction
  | SetTriviaAnwersAction
  | SubmitTriviaAction;
