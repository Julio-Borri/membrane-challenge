// Module dependencies
import { createContext } from 'react';
import { Web3State } from '../interfaces/web3Interfaces';
import { Web3Actions } from '../actions/index';
import { Web3ActionTypes } from '../action-types/index';

const Web3Context = createContext(null);

const web3InitialState: Web3State = {
  web3: null,
  accounts: null,
  contract: null,
  currentChain: '',
};

const web3reducer = (
  state: Web3State,
  action: Web3Actions
): Web3State => {
  const { SET_CURRENT_CHAIN, SET_CONTRACT_DATA } = Web3ActionTypes

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
      };

    default:
      return state;
  }
};

export { Web3Context, web3InitialState, web3reducer };
