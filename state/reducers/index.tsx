// Module dependencies
import { createContext, Dispatch } from 'react';
import { AppState, NetworkSates } from '../interfaces';
import { Actions } from '../actions/index';
import { ActionTypes } from '../action-types/index';

// const AppContext = createContext(null);

const initialState: AppState = {
  // NetworkState
  web3: null,
  accounts: null,
  contract: null,
  currentChain: '',
  networkState: NetworkSates.UNCONNECTED,
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
  const { SET_CURRENT_CHAIN, SET_CONTRACT_DATA } = ActionTypes

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

    default:
      return state;
  }
};

export { AppContext, initialState, reducer };
