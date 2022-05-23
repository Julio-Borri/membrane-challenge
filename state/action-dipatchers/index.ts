// Module dependencies
import { Dispatch } from "react";
import { Actions } from "../actions";
import { ActionTypes } from "../action-types";
import getWeb3 from '../../configs/web3';

// Assets
import { contractAddress, wording } from '../../utils/constants';
import { QuizTokenABI } from '../../contracts/QuizTokenABI';


const actionDispatcher = (dispatch: Dispatch<Actions>) => {
  const { SET_CURRENT_CHAIN, SET_CONTRACT_DATA } = ActionTypes
  const { WEB3_ERROR } = wording;

  /**
   * Detect the current network chain Id and save it in context.
   */
  const handleNetworkChange = async (): Promise<void> => {
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });

    dispatch({
      type: SET_CURRENT_CHAIN,
      payload: chainId,
    });
  };

  /**
   * Connect the logged metamask account to the current site.
   */
  const handleConnect = async (): Promise<void> => {
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

  /**
   * Switch the connection to the ethereum target chain.
   * @param chainId Id for the network to change to.
   */
  const handleChangeNetwork = async (chainId: string): Promise<void> => {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId }],
    });
  };

  return { handleConnect, handleChangeNetwork };
};

export default actionDispatcher;
