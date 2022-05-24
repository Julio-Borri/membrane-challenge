// Module dependencies
import { ActionTypes } from '../action-types';
import { SurveyInterface } from '../interfaces';


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

interface SetAvailableTriviasAction {
  type: ActionTypes.SET_AVAILABLE_TRIVIAS;
  payload: Array<SurveyInterface>;
}

export type Actions =
  | SetCurrentChainAction
  | SetContractDataAction
  | SetQuizTokenBalanceAction
  | SetAvailableTriviasAction;
