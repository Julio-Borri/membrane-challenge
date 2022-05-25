// Module dependencies
import { Dispatch } from "react";
import { Actions } from "../actions";
import { ActionTypes } from "../action-types";
import getWeb3 from '../../configs/web3';
import { AppState, SurveyInterface, TriviaStates } from '../interfaces';

// Assets
import { contractAddress, wording } from '../../utils/constants';
import { QuizTokenABI } from '../../contracts/QuizTokenABI';


const actionDispatcher = (
  state: AppState,
  dispatch: Dispatch<Actions>
) => {
  const { WEB3_ERROR } = wording;

  /**
   * Detect the current network chain Id and save it in context.
   */
  const handleNetworkChange = async (): Promise<void> => {
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });

    dispatch({
      type: ActionTypes.SET_CURRENT_CHAIN,
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
        type: ActionTypes.SET_CONTRACT_DATA,
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

  /**
   * Fecth the amount of Token for the current address and save in context.
   */
  const getQuizTokenBalance = async (): Promise<void> => {
    const { accounts, contract } = state;
      
    const balance = await contract.methods
      .balanceOf(accounts[0])
      .call();

    dispatch({
      type: ActionTypes.SET_QUIZ_TOKEN_BALANCE,
      payload: balance,
    });
  };

  /**
   * Save available trivias in context.
   * @param data List os available trivias.
   */
  const setAvailableTrivias = (data: Array<SurveyInterface>): void => {
    dispatch({
      type: ActionTypes.SET_AVAILABLE_TRIVIAS,
      payload: data,
    });
  };

  const initializeTrivia = (triviaId: number): void => {
    const { availableTrivias } = state;

    dispatch({
      type: ActionTypes.INITIALIZE_TRIVIA,
      payload: availableTrivias.find(({ id }) => id === triviaId)
    });
  };

  const setTriviaAnswers = (answers: { [key: string]: string }) => {
    dispatch({
      type: ActionTypes.SET_TRIVIA_ANSWERS,
      payload: answers
    });
  };

  return {
    handleConnect,
    handleChangeNetwork,
    getQuizTokenBalance,
    setAvailableTrivias,
    initializeTrivia,
    setTriviaAnswers,
  };
};

export default actionDispatcher;
