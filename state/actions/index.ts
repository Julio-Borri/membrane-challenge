import { ActionTypes } from '../action-types';
import { AppState } from '../interfaces';

interface SetCurrentChainAction {
  type: ActionTypes.SET_CURRENT_CHAIN;
  payload: string;
}

interface SetContractDataAction {
  type: ActionTypes.SET_CONTRACT_DATA;
  payload: AppState;
}

export type Actions =
  | SetCurrentChainAction
  | SetContractDataAction;
