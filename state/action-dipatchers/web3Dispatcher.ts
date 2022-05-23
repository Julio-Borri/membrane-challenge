// Module dependencies
import { Dispatch } from "react";
import { Web3Actions } from "../actions";
import { Web3ActionTypes } from "../action-types";
import getWeb3 from '../../configs/web3';

// Assets
import { contractAddress, wording } from '../../utils/constants';
import { QuizTokenABI } from '../../contracts/QuizTokenABI';


const web3Disptacher = (dispatch: Dispatch<Web3Actions>): void => {
  const { SET_CURRENT_CHAIN, SET_CONTRACT_DATA } = Web3ActionTypes
  const { WEB3_ERROR } = wording;

  /**
   * Detect the current network chain Id and save it in context.
   */
  const handleNetworkChange = async () => {
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });

    dispatch({
      type: SET_CURRENT_CHAIN,
      payload: chainId,
    });
  };

  // TODO: Add function description
  const handleConnect = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      if (window.ethereum)
        window.ethereum.on('chainChanged', handleNetworkChange);

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();

      // Get the contract instance.
      const instance = new web3.eth.Contract(
        QuizTokenABI,
        contractAddress
      );

      // Set web3, accounts, and contract to the state
      dispatch({
        type: SET_CONTRACT_DATA,
        payload: {
          currentChain: `0x${networkId}`,
          web3,
          accounts,
          contract: instance,
        }
      });

    } catch (error) {
      // TODO: Save error in context. Display a Modal with information
      alert(WEB3_ERROR);
      console.error(error);
    }
  };
};

export default web3Disptacher;
