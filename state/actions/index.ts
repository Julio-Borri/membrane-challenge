import { Web3ActionTypes } from '../action-types';
import { Web3State } from '../interfaces/web3Interfaces';

interface SetCurrentChainAction {
  type: Web3ActionTypes.SET_CURRENT_CHAIN;
  payload: string;
}

interface SetContractDataAction {
  type: Web3ActionTypes.SET_CONTRACT_DATA;
  payload: Web3State;
}

export type Web3Actions =
  | SetCurrentChainAction
  | SetContractDataAction;
