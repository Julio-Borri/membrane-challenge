// Module dependencies
import { ActionTypes } from '../action-types';
import { Survey } from '../interfaces';


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

interface SetDailyTriviaAction {
  type: ActionTypes.SET_DAILY_TRIVIA;
  payload: Survey;
}

export type Actions =
  | SetCurrentChainAction
  | SetContractDataAction
  | SetQuizTokenBalanceAction
  | SetDailyTriviaAction;
